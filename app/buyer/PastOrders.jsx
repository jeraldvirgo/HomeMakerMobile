import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/Colors";
import { DataTable } from "react-native-paper";
import { getPastOrdersByOderId } from "../network/HttpService";
export function PastOrders({ route, navigation }) {
  const { orderId } = route.params;
  const [orderList, setOrderList] = React.useState([]);

  React.useEffect(() => {
    async function loadInfo() {
      const orders = await getPastOrdersByOderId(orderId);
      console.debug("Received UI  orders:> ", orders);
      setOrderList(orders);
    }
    loadInfo();
  }, []);
  React.useEffect(() => {
    console.debug("Updated UI orderList:> ", orderList);
  }, [orderList]);

  // Calculate total price from orderList
  const calculatedTotalPrice = orderList.reduce(
    (sum, item) => sum + item.quantity * item.productPrice,
    0
  );

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
          <DataTable.Title>
            <Text style={styles.textStyleHeader}>Total</Text>
          </DataTable.Title>
        </DataTable.Header>
        {orderList.slice(0, orderList.length).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.productName}</DataTable.Cell>
            <DataTable.Cell>{item.quantity}</DataTable.Cell>
            <DataTable.Cell>{item.productPrice}</DataTable.Cell>
            <DataTable.Cell>{item.quantity * item.productPrice}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Text style={styles.textTotalAmount}>
        Your Total Amount ₹ {calculatedTotalPrice}
      </Text>
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
