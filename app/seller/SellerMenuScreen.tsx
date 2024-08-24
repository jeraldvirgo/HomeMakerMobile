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
import {
  CustomBoldLabel,
  CustomBoldStockLable,
} from "../../components/CustomLabel";
import { CustomSwitch } from "../../components/CustomSwitch";

export function SellerMenuScreen({ navigation }) {
  const [brandId, setBrandId] = React.useState(null);
  const [productList, setProductList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState(null);
  let brandID: string;
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
          console.debug("SellerMenuScreen BrandIfo", brandID);
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
          <Text></Text>
          <View style={styles.foodType}>
            <View style={styles.CircleShape} />
            <Text style={styles.title}>{item.productName} </Text>
          </View>

          <Text style={styles.subTitle}> {item.type}</Text>
          <Text style={styles.subTitle}>
            {item.productDescriptionAdditional}
          </Text>
          <Text></Text>
          <View style={styles.stockPriceContainer}>
            <CustomBoldStockLable
              title={"₹" + item.productPrice}
            ></CustomBoldStockLable>
            <CustomSwitch
              onValueChange={toggleSwitch}
              value={isEnabled}
              colorValue={isEnabled}
              title="In Stock"
            ></CustomSwitch>
          </View>
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
        <View style={styles.listview}>
          <FlatList
            data={productList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <TouchableOpacity
            onPress={handleAddProduct}
            style={{
              borderWidth: 3,
              borderColor: COLORS.BUTTON,
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              position: "absolute",
              bottom: 10,
              right: 10,
              height: 50,
              backgroundColor: COLORS.BUTTON,
              borderRadius: 100,
            }}
          >
            <Image
              source={require("../../assets/add_icon.png")}
              style={styles.imageSize}
            />
          </TouchableOpacity>
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
    marginHorizontal: 5,
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
  imageSize: { width: 30, height: 30 },
  listview: {
    height: "100%",
  },
  stockPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: COLORS.BUTTON,
    borderTopWidth: 0.5,
  },
});
