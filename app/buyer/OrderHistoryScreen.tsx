import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import React from "react";

import { CustomBoldLabel, CustomLabel } from "../../components/CustomLabel";
import { getApplicationInfo } from "../../constants/StoreInfo";
import { getAllPurchaseHistory } from "../network/HttpService";
import { ProfileInfo } from "../../components/ProfileInfo";
import { COLORS } from "../../constants/Colors";

export function OrderHistoryScreen({ route, navigation }) {
  const [userName, setUserName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [orderList, setOrderList] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);
  const [avatarUrl, setAvatarUrl] = React.useState(
    "https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
  );

  React.useEffect(() => {
    const loadStoredInfo = async () => {
      try {
        setUserName(await getApplicationInfo("userName"));
        setPhoneNumber(await getApplicationInfo("phoneNumber"));
        setAddress(await getApplicationInfo("address"));
        setAvatarUrl(await getApplicationInfo("avatarUrl"));
        setOrderList(
          await getAllPurchaseHistory(
            Number(await getApplicationInfo("userId"))
          )
        );
        console.log("userName", userName);
        console.log("AvatarUrl", avatarUrl);
      } catch (error) {
        console.debug("Error from AsyncStorage", error);
      }
    };
    loadStoredInfo();
  }, []);

  const handleItemPress = (id: any) => {
    setSelectedId(id);
    console.debug("Item Selected", id);
    // navigation.navigate("Food", { id: id });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        handleItemPress(item.orderId);
      }}
    >
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: item.brandImageUrl }}
          resizeMode="cover"
        />
        <View style={styles.cardRight}>
          <Text style={styles.title}>{item.brandName} </Text>
          <Text style={styles.subTitle}>
            {item.status == 0 ? "Delivered" : "Open"}
          </Text>
          <Text style={styles.title}> ₹ {item.totalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.col}>
      <View style={styles.profileCard}>
        <ProfileInfo avatarImageUrl={avatarUrl} />
        <View style={styles.profile}>
          <Text style={styles.title}>{userName}</Text>
          <Text style={styles.subTitle}>{address}</Text>
          <Text style={styles.subTitle}>{phoneNumber}</Text>
        </View>
        <View>
          <CustomBoldLabel
            style={styles.subTitle}
            title="Your Order History"
          ></CustomBoldLabel>
        </View>
      </View>
      <FlatList
        data={orderList}
        keyExtractor={(item) => item.orderId}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    fontSize: 18,
  },
  title: {
    textAlign: "auto",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 0.5,
    marginTop: 5,
    margin: 5,
  },
  col: {
    flexDirection: "column",
    marginTop: 5,
  },
  profile: {
    flexDirection: "column",
    padding: 10,
    width: "90%",
    alignItems: "center",
  },
  cardRight: {
    alignItems: "stretch",
    justifyContent: "center",
  },
  image: {
    width: 106,
    height: 99,
    margin: 8,
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: COLORS.TEXTBOX_BORDER,
  },
  indicator: {
    flex: 2,
  },
  subTitle: {
    textAlign: "auto",
    fontWeight: "300",
  },
  profileCard: {
    flexDirection: "column",
    borderRadius: 8,
    marginBottom: 1,
    padding: 10,
    alignItems: "center",
  },
});
