import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { getAllSellers } from "../network/HttpService";
import { COLORS } from "../../constants/Colors";
export function ProductListScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [brandList, setBrandList] = useState(null);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    async function getBrands() {
      setBrandList(await getAllSellers());
      setLoading(false);
    }
    getBrands();
  }, []);

  const handleItemPress = (id: any, brandName: any) => {
    setSelectedId(id);
    console.debug("Item Selected", id);
    navigation.navigate("Food", { id: id, brandName: brandName });
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        handleItemPress(item.id, item.brandName);
      }}
    >
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: item.brandImageUrl }}
          resizeMode="cover"
        />
        <View style={styles.cardRight}>
          <View style={styles.foodType}>
            <View style={styles.CircleShape} />
            <Text style={styles.title}>{item.brandName} </Text>
          </View>

          <Text style={styles.subTitle}> {item.brandSubType}</Text>
          <Text style={styles.subTitle}> {item.brandLocation}</Text>
          <Text>
            {" "}
            Time: {item.brandTimingOpen} - {item.brandTimingClose}{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.indicator} />
      ) : (
        <FlatList
          data={brandList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
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
  subTitle: {
    textAlign: "auto",
    fontWeight: "300",
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 0.5,
    marginTop: 8,
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
    borderWidth: 1,
    borderColor: COLORS.TEXTBOX_BORDER,
  },
  indicator: {
    flex: 1,
  },
  CircleShape: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: COLORS.VEG,
    flexDirection: "column",
  },
  foodType: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    minWidth: "65%",
  },
});
