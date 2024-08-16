import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/Colors";
import { CustomBoldLabel, CustomLabel } from "../../components/CustomLabel";
import { DataTable } from "react-native-paper";
import { getSellerOrderList } from "../network/HttpService";

export function SellerOrdersScreen() {
  const [orderList, setOrderList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const loadOrderList = async () => {
      try {
        setOrderList(await getSellerOrderList(1));
        setLoading(false);
      } catch (error) {
        console.debug("Error from AsyncStorage", error);
      }
    };
    loadOrderList();
  }, []);

  const renderItem = ({ item, index }) => (
    <>
      {/* <View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text>{"Orders"}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text>{"Ready"}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text>{"Delivered"}</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={styles.card}>
        <CustomLabel title={item.userName}></CustomLabel>
        <CustomLabel title={item.userAddress}></CustomLabel>
        <CustomLabel title={item.userMobileNumber}></CustomLabel>
        <View style={styles.orderValue}>
          <CustomBoldLabel title={item.totalPrice}></CustomBoldLabel>
        </View>
        <View>
          <DataTable style={styles.tableContainer}>
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
            {item.customerProductOrder
              .slice(0, item.customerProductOrder.length)
              .map((tabItem: any) => (
                <DataTable.Row key={tabItem.id}>
                  <DataTable.Cell>{tabItem.productName}</DataTable.Cell>
                  <DataTable.Cell>{tabItem.quantity}</DataTable.Cell>
                  <DataTable.Cell>{tabItem.productPrice}</DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.processButton}>
            <Text>{"Prepare"}</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.processButton}>
              <Text>{"Done"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.indicator} />
      ) : (
        <FlatList
          data={orderList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    fontWeight: "heavy",
  },
  button: {
    alignItems: "center",
    fontWeight: "bold",
    padding: 10,
    margin: 3,
    paddingLeft: 5,
    minWidth: "31.5%",
    // borderBottomWidth: 2,
    // borderColor: COLORS.BUTTON,
    elevation: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    fontWeight: "heavy",
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#fbfbfb",
    borderWidth: 4,
    borderColor: "#DCDCDC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  orderValue: {
    flexDirection: "row-reverse",
  },
  processButton: {
    alignItems: "center",
    backgroundColor: COLORS.BUTTON,
    padding: 10,
    borderRadius: 30,
    fontWeight: "normal",
    fontSize: 20,
    margin: 10,
    minWidth: "45%",
  },
  tableContainer: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: COLORS.WHITE_BUTTON,
    borderRadius: 8,
  },
  textStyleHeader: {
    textAlign: "center",
    fontWeight: "900",
  },
  container: {
    flex: 1,
  },
  indicator: {
    flex: 1,
  },
});
