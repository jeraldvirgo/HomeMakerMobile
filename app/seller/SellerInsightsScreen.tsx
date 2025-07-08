import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";
import React from "react";
import { DataTable } from "react-native-paper";
import {
  getBusinessInsights,
  getBusinessInsightsRevenue,
} from "../network/HttpService";
import { getApplicationInfo } from "../../constants/StoreInfo";
import { useFocusEffect } from "@react-navigation/native";
import { InsightsSummary } from "../data/PurchaseHistory";

export function SellerInsightsScreen() {
  const insightsSummaryDefault: InsightsSummary = {
    dayRevenue: 0,
    dayRevenueStartDateString: "",
    dayRevenueEndDateString: "",
    weekRevenue: 0,
    weekRevenueStartDateString: "",
    weekRevenueEndDateString: "",
    monthRevenue: 0,
    monthRevenueStartDateString: "",
    monthRevenueEndDateString: "",
  };
  let brandID: string;
  const [orderList, setOrderList] = React.useState([]);
  const [brandId, setBrandId] = React.useState(null);
  const [revenueInsights, setRevenueInsights] = React.useState(
    insightsSummaryDefault
  );

  React.useEffect(() => {
    async function loadInfo() {
      console.debug("Loading BrandIfo", brandId);
      try {
        brandID = await getApplicationInfo("brandId");
        setBrandId(brandID);
      } catch (error) {
        console.debug("Error from AsyncStorage", error);
      }
    }
    loadInfo();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function loadInfo() {
        this.setTimeout(async () => {
          console.debug("Updated UI orderList:> ", orderList);
          const orders = await getBusinessInsights(Number(brandId));
          setOrderList(orders);
          setRevenueInsights(await getBusinessInsightsRevenue(Number(brandId)));
          console.debug("Business Insights: ", orders);
        }, 1000);
      }
      loadInfo();
    }, [brandId])
  );

  return (
    <View style={styles.container}>
      <Text>Delivered Orders</Text>
      <View style={styles.card}>
        <Text>Today {revenueInsights.dayRevenueStartDateString}</Text>
        <Text> ₹ {revenueInsights.dayRevenue}</Text>
        <Text>8 Orders</Text>
      </View>
      <View style={styles.cardRow}>
        <Text>
          This Week {revenueInsights.weekRevenueStartDateString} -{" "}
          {revenueInsights.weekRevenueEndDateString}
        </Text>
        <Text> ₹ {revenueInsights.weekRevenue}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text>
          This Month {revenueInsights.monthRevenueStartDateString} -{" "}
          {revenueInsights.monthRevenueEndDateString}
        </Text>
        <Text> ₹ {revenueInsights.monthRevenue}</Text>
      </View>
      <View style={styles.container}>
        <Text>Top dishes in your menu</Text>
        <View>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>
                <Text style={styles.textStyleHeader}>Menu Items</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textStyleHeader}>Price</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textStyleHeader}>Quantity</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textStyleHeader}>Revenue</Text>
              </DataTable.Title>
            </DataTable.Header>
            {orderList.slice(0, orderList.length).map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.productName}</DataTable.Cell>
                <DataTable.Cell>{item.quantity}</DataTable.Cell>
                <DataTable.Cell>{item.productPrice}</DataTable.Cell>
                <DataTable.Cell>
                  {item.quantity * item.productPrice}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "#26c9c1",
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  cardRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#26c9c1",
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  tableContainer: {
    padding: 15,
  },
  container: {
    flexDirection: "column",
    padding: 10,
  },
  indicator: {
    flex: 1,
  },
  text: {
    color: "white",
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
});
