import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/Colors";
import { CustomBoldLabel, CustomLabel } from "../../components/CustomLabel";
import { DataTable } from "react-native-paper";
import { getSellerOrderList } from "../network/HttpService";
import { useFocusEffect } from "@react-navigation/native";
import { getApplicationInfo } from "../../constants/StoreInfo";
import Icon from "react-native-vector-icons/Ionicons";

export function SellerOrdersScreen() {
  let brandID: string;
  const [orderList, setOrderList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [brandId, setBrandId] = React.useState(null);
  React.useEffect(() => {
    const loadOrderList = async () => {
      try {
        brandID = await getApplicationInfo("brandId");
        setBrandId(brandID);
        setOrderList(await getSellerOrderList(Number(brandID)));
        setLoading(false);
      } catch (error) {
        console.debug("Error from AsyncStorage", error);
      }
    };
    loadOrderList();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      async function loadInfo() {
        this.setTimeout(async () => {
          console.debug("<<<<<<Reloading Product on focus changed>>>>>>>");
          console.debug("Loading BrandIfo", brandID);
          setOrderList(await getSellerOrderList(Number(brandID)));
          setLoading(false);
        }, 1000);
      }
      loadInfo();
    }, [])
  );

  const renderItem = ({ item, index }) => (
    <>
      <View style={styles.card}>
        <CustomBoldLabel title={item.userMobileNumber}></CustomBoldLabel>
        <CustomLabel title={item.userName}></CustomLabel>
        <CustomLabel title={item.userAddress}></CustomLabel>
        <View style={styles.orderValue}>
          <CustomBoldLabel title={" ₹ " + item.totalPrice}></CustomBoldLabel>
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
          <TouchableOpacity style={styles.prepareButton}>
            <Text style={styles.text}>{"Prepare"}</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.text}>{"Done"}</Text>
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
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text>{"Orders"}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text>{"Ready"}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.button}>
                <Text>{"Delivered"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={orderList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
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
    fontWeight: "900",
    padding: 10,
    margin: 3,
    paddingLeft: 5,
    minWidth: "31.5%",
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
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  orderValue: {
    flexDirection: "row-reverse",
  },
  prepareButton: {
    alignItems: "center",
    backgroundColor: COLORS.PREPARE_BUTTON,
    padding: 10,
    borderRadius: 30,
    fontWeight: "normal",
    fontSize: 20,
    margin: 10,
    minWidth: "45%",
  },
  doneButton: {
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
    fontWeight: "bold",
    color: "black",
  },
  container: {
    flex: 1,
  },
  indicator: {
    flex: 1,
  },
  text: {
    color: "white",
  },
});
