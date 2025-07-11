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
import { getSellerOrderList, updateOrdersStatus } from "../network/HttpService";
import { useFocusEffect } from "@react-navigation/native";
import { getApplicationInfo } from "../../constants/StoreInfo";
import { SellerOrder } from "../data/SellerOrder";

export function SellerOrdersScreen() {
  let brandID: string;
  const [orderList, setOrderList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [brandId, setBrandId] = React.useState(1);
  const [currentTab, setCurrentTab] = React.useState("Orders");
  React.useEffect(() => {
    const loadOrderList = async () => {
      try {
        brandID = await getApplicationInfo("brandId");
        console.debug("BrandID from AsyncStorage: ", brandID);
        setBrandId(Number(brandID));
      } catch (error) {
        console.debug("Error from AsyncStorage", error);
      }
    };
    loadOrderList();
  }, []);

  React.useEffect(() => {
    console.debug("BrandID changed: ", brandId);
  }, [brandId]);

  React.useEffect(() => {
    async function loadInfo() {
      console.debug("Updated UI orderList:> ", orderList);
      const orders = await getSellerOrderList(Number(brandID));
      setOrderList(currentTabFilter(currentTab, orders));
      setLoading(false);
    }
    loadInfo();
  }, [brandId]);

  useFocusEffect(
    React.useCallback(() => {
      async function loadInfo() {
        setTimeout(async () => {
          console.debug("<<<<<<Reloading Product on focus changed>>>>>>>");
          console.debug("Loading BrandIfo", brandID);
          const orders = await getSellerOrderList(Number(brandID));
          setOrderList(currentTabFilter(currentTab, orders));
          setLoading(false);
        }, 1000);
      }
      loadInfo();
    }, [])
  );

  const handleOrdersTab = async () => {
    setCurrentTab("Orders");
    if (brandId) {
      setLoading(true);
      const orders = await getSellerOrderList(Number(brandId));
      setOrderList(currentTabFilter("Orders", orders));
      setLoading(false);
    }
  };
  const handleReadyTab = async () => {
    setCurrentTab("Ready");
    if (brandId) {
      setLoading(true);
      const orders = await getSellerOrderList(Number(brandId));
      setOrderList(currentTabFilter("Ready", orders));
      setLoading(false);
    }
  };

  const handleDeliveredTab = async () => {
    setCurrentTab("Delivered");
    if (brandId) {
      setLoading(true);
      const orders = await getSellerOrderList(Number(brandId));
      setOrderList(currentTabFilter("Delivered", orders));
      setLoading(false);
    }
  };
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items found</Text>
    </View>
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
                <DataTable.Row key={tabItem.productId}>
                  <DataTable.Cell>{tabItem.productName}</DataTable.Cell>
                  <DataTable.Cell>{tabItem.quantity}</DataTable.Cell>
                  <DataTable.Cell>{tabItem.productPrice}</DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </View>
        {item.status != 2 && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.prepareButton}
              onPress={() => handlePrepareAction(item.orderId, item.status)}
            >
              <Text style={styles.text}>{"Prepare"}</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={styles.doneButton} disabled>
                <Text style={styles.text}>{"Done"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
            <TouchableOpacity style={styles.button} onPress={handleOrdersTab}>
              <Text>{"Orders"}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleReadyTab}>
                <Text>{"Ready"}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDeliveredTab}
              >
                <Text>{"Delivered"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={orderList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={
              orderList.length === 0 && styles.flatListContainer
            }
          />
        </View>
      )}
    </View>
  );
  async function handlePrepareAction(id: string, status: number) {
    const updatedStatus: number = Number(status) + 1;
    const updateResult = await updateOrdersStatus(id, updatedStatus);
    console.debug("Update Result for Prepare Action:", updateResult);
    setOrderList([]);
  }
  function currentTabFilter(
    currentTab: string,
    orders: SellerOrder[] | null
  ): SellerOrder[] {
    const safeOrders = Array.isArray(orders) ? orders : [];
    switch (currentTab) {
      case "Orders":
        // Show orders that are not ready or delivered
        return safeOrders.filter((order) => order.status == 0);
      case "Ready":
        // Show orders that are ready to be delivered
        return safeOrders.filter((order) => order.status == 1);
      case "Delivered":
        // Show orders that are delivered
        return safeOrders.filter((order) => order.status == 2);
      default:
        return safeOrders;
    }
  }
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
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  flatListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
