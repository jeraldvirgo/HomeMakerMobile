import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { DataTable } from "react-native-paper";
import { sellerProductList } from "../../constants/Application";
import * as React from "react";
import { getApplicationInfo } from "../../constants/StoreInfo";
import { placeOrder } from "../network/HttpService";
import { COLORS } from "../../constants/Colors";
export function OrderScreen({ route, navigation }) {
  const [userName, setUserName] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [address, setAddress] = React.useState();
  const [totalCost, setTotalCost] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { order, brandId, products } = route.params;

  const onPress = async () => {
    var data = {
      userId: await getApplicationInfo("userId"),
      brandId: brandId,
      orders: order.orders,
    };
    console.debug("data>>>", data);
    placeOrder(data);
    setModalVisible(true);
    // navigation.navigate("Resturants");
  };
  const gpayPay = async () => {
    setModalVisible(false);
    navigation.navigate("UPI");
  };
  const payLater = async () => {
    setModalVisible(false);
    navigation.navigate("Resturants");
  };
  React.useEffect(() => {
    const firstLaunch = async () => {
      setUserName(await getApplicationInfo("userName"));
      setPhoneNumber(await getApplicationInfo("phoneNumber"));
      setAddress(await getApplicationInfo("address"));
    };
    firstLaunch();
  }, []);

  console.log("Brand Id", brandId);

  function getOrderNameCost(orderId) {
    console.log("products >>>>>", products);
    for (i = 0; i < products.length; i++) {
      if (products[i].id == orderId) {
        return products[i];
      }
    }
    return null;
  }
  let orderDetail = [];
  let totalCostOfPurchase = 0;

  React.useEffect(() => {
    for (i = 0; i < order.orders.length; i++) {
      let productSelected = getOrderNameCost(order.orders[i].productId);
      console.log("productSelected>>>>", productSelected);
      if (productSelected == null) {
        break;
      }
      productSelected.count = order.orders[i].quantity;
      orderDetail.push(productSelected);
      totalCostOfPurchase =
        Number(totalCostOfPurchase) +
        productSelected.productPrice * order.orders[i].quantity;
      setTotalCost(totalCostOfPurchase);
    }
    console.log("totalCostOfPurchase>>", totalCostOfPurchase);
    console.log("orderDetail>>", orderDetail);
  }, []);

  const [items] = React.useState(orderDetail);
  return (
    <View>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>
            <Text style={styles.textStyleHeader}>Order</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.textStyleHeader}>Quantity</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.textStyleHeader}>Cost</Text>
          </DataTable.Title>
        </DataTable.Header>
        {items.slice(0, items.length).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.productName}</DataTable.Cell>
            <DataTable.Cell>{item.count}</DataTable.Cell>
            <DataTable.Cell>{item.productPrice}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Text style={styles.textTotalAmount}>
        Your Total Amount ₹ {totalCost}
      </Text>
      {/* <Text style={styles.textStyle}>Name : {userName}</Text>
      <Text style={styles.textStyle}>Phone: {phoneNumber}</Text>
      <Text style={styles.textStyle}>Delivery Details Address</Text>
      <Text style={styles.textStyle}>{address}</Text> */}
      <View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Place Order </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Order Place Make Payment</Text>
              <View>
                <TouchableOpacity style={styles.button} onPress={gpayPay}>
                  <Text>Pay Using Gpay</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.button} onPress={payLater}>
                  <Text> Pay Later </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: COLORS.WHITE_BUTTON,
    borderRadius: 8,
  },
  textStyle: {
    textAlign: "center",
  },
  textStyleHeader: {
    textAlign: "center",
    fontWeight: "900",
  },
  textTotalAmount: {
    textAlign: "center",
    fontWeight: "900",
    borderColor: COLORS.TEXTBOX_BORDER,
    padding: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.BUTTON,
    padding: 10,
    marginTop: 50,
    paddingHorizontal: 100,
    borderRadius: 30,
    fontWeight: "normal",
    margin: 20,
    fontSize: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
