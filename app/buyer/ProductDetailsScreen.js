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
import { getAllProducts } from "../network/HttpService";
import { COLORS } from "../../constants/Colors";
export function ProductDetailsScreen({ route, navigation }) {
  const { id, brandId, brandName } = route.params;
  const [mapState, setMapState] = useState(new Map());
  const [totalCost, setTotalCost] = React.useState(0);
  const [itemCount, setItemCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [productList, setProductList] = useState(null);
  React.useEffect(() => {
    async function loadProductList() {
      setProductList(await getAllProducts(id));
      setLoading(false);
      navigation.setOptions({ title: brandName });
    }
    loadProductList();
  }, []);
  const updateMap = (key, value) => {
    setMapState((map) => new Map(map.set(key, value)));
  };
  const onPress = () => {
    console.log("Check out Items : ", mapState);
    orders = [];
    mapState.forEach((value, key) => {
      console.log(key, value);
      item = {};
      item["productId"] = key;
      item["quantity"] = value;
      orders.push(item);
    });
    let ordersString = { orders };
    console.log("Sending Payload : ", ordersString);
    navigation.navigate("Order", {
      order: ordersString,
      brandId: id,
      products: productList,
    });
  };

  const onPressIncrement = (id, productCost) => {
    let count = mapState.get(id) == null ? 0 : mapState.get(id);
    count++;
    let incrementCount = itemCount + 1;
    console.log("totalCost", totalCost);
    console.log("productCost", productCost);
    setItemCount(incrementCount);
    setTotalCost(Number(totalCost) + Number(productCost));
    updateMap(id, count);
  };

  const onPressDecrement = (id, productCost) => {
    let count = mapState.get(id) == null ? 0 : mapState.get(id);
    if (count != 0) {
      count--;
      let incrementCount = itemCount - 1;
      console.log("totalCost", totalCost);
      console.log("productCost", productCost);
      setItemCount(incrementCount);
      setTotalCost(Number(totalCost) - Number(productCost));
    }
    updateMap(id, count);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={{ uri: item.productImageUrl }}
        resizeMode="cover"
      />
      <View style={styles.cardContentContainer}>
        <Text style={styles.title}>{item.productName} </Text>
        <Text style={styles.subTitle}> {item.productDescription}</Text>

        <View style={styles.cartContainer}>
          <Text style={styles.title}> {item.productPrice} ₹</Text>

          <View style={styles.counterView}>
            <TouchableOpacity
              style={styles.buttonCounter}
              onPress={() => {
                onPressIncrement(item.id, item.productPrice);
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
            <Text style={styles.counterString}>
              {mapState.get(item.id) != null ? mapState.get(item.id) : 0}
            </Text>
            <TouchableOpacity
              style={styles.buttonCounter}
              onPress={() => {
                onPressDecrement(item.id, item.productPrice);
              }}
            >
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.indicator} />
      ) : (
        <>
          <FlatList
            data={productList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text>
                {itemCount} Items Total ₹ {totalCost} View Cart
              </Text>
            </TouchableOpacity>
          </View>
        </>
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
  cartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "65%",
  },
  cardContainer: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 0.5,
    marginTop: 8,
    margin: 8,
  },
  cardContentContainer: {
    alignItems: "stretch",
    justifyContent: "center",
  },
  cardImage: {
    width: 106,
    height: 99,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.TEXTBOX_BORDER,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.BUTTON,
    paddingVertical: 10,
    marginBottom: 20,
    paddingHorizontal: 100,
    borderRadius: 30,
    fontWeight: "normal",
    margin: 10,
    fontSize: 20,
  },
  buttonCounter: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE_BUTTON,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderColor: COLORS.TEXTBOX_BORDER,
    fontWeight: "bold",
  },
  indicator: {
    flex: 1,
  },
  title: {
    textAlign: "auto",
    fontWeight: "bold",
  },
  counterString: {
    fontWeight: "bold",
    textAlign: "left",
    paddingTop: 5,
  },
  subTitle: {
    textAlign: "auto",
    fontWeight: "300",
  },
  counterView: {
    width: 91,
    height: 36,
    borderRadius: 20,
    borderColor: COLORS.TEXTBOX_BORDER,
    borderWidth: 2,
    backgroundColor: COLORS.WHITE_BUTTON,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});
