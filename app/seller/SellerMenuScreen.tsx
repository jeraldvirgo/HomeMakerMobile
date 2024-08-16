import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { getApplicationInfo } from "../../constants/StoreInfo";
import { getAllProducts } from "../network/HttpService";
import { COLORS } from "../../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";

export function SellerMenuScreen({ navigation }) {
  const [brandId, setBrandId] = React.useState(null);
  const [productList, setProductList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState(null);
  let brandID: string;
  React.useEffect(() => {
    async function loadInfo() {
      brandID = await getApplicationInfo("brandId");
      setBrandId(brandID);
      console.debug("Loading BrandIfo", brandID);
      setProductList(await getAllProducts(Number(brandID)));
      setLoading(false);
    }
    loadInfo();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      async function loadInfo() {
        this.setTimeout(async () => {
          console.debug("<<<<<<Reloading Product on focus changed>>>>>>>");
          brandID = await getApplicationInfo("brandId");
          setBrandId(brandID);
          console.debug("Loading BrandIfo", brandID);
          setProductList(await getAllProducts(Number(brandID)));
          setLoading(false);
        }, 1000);
      }
      loadInfo();
    }, [])
  );
  const handleAddProduct = async () => {
    console.debug("Add Product");
    navigation.navigate("CreateProductScreen");
  };
  const handleItemPress = (id: any, brandName: any) => {
    setSelectedId(id);
    console.debug("Item Selected", id);
    // navigation.navigate("Food", { id: id, brandName: brandName });
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        handleItemPress(item.id, item.productName);
      }}
    >
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: item.productImageUrl }}
          resizeMode="cover"
        />
        <View style={styles.cardRight}>
          <View style={styles.foodType}>
            <View style={styles.CircleShape} />
            <Text style={styles.title}>{item.productName} </Text>
          </View>

          <Text style={styles.subTitle}> {item.type}</Text>
          <Text style={styles.subTitle}>
            {" "}
            {item.productDescriptionAdditional}
          </Text>
          {/* <Text>
            {" "}
            Time: {item.brandTimingOpen} - {item.brandTimingClose}{" "}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
  // return (
  //   <View>
  //     <CustomButton onPress={handleAddProduct} title={"Add Product"} />
  //   </View>
  // );
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.indicator} />
      ) : (
        <View>
          <CustomButton onPress={handleAddProduct} title={"Add Product"} />
          <FlatList
            data={productList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 0.5,
    marginTop: 8,
  },
  image: {
    width: 106,
    height: 99,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.TEXTBOX_BORDER,
  },
  foodType: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    minWidth: "65%",
  },
  cardRight: {
    alignItems: "stretch",
    justifyContent: "center",
  },
  CircleShape: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: COLORS.VEG,
    flexDirection: "column",
  },
  title: {
    textAlign: "auto",
    fontWeight: "bold",
  },
  subTitle: {
    textAlign: "auto",
    fontWeight: "300",
  },
  indicator: {
    flex: 1,
  },
});
