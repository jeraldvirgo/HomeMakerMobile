import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { getPastOrdersByOderId } from "../network/HttpService";
export function PastOrders({ route, navigation }) {
  const { orderId } = route.params;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    const fetchOrders = async () => {
      console.debug("Fetching Past Orders for Order ID: ", orderId);
      try {
        const data = await getPastOrdersByOderId(orderId);
        setOrders(data);
      } catch (error) {
        setErrorMsg("Failed to load past orders");
        console.error(error);
      } finally {
        setLoading(false);
        console.debug("Fetched Past Length: ", orders.length);
      }
    };
    if (orderId != undefined) {
      fetchOrders();
    } else {
      console.error("Order ID is undefined");
    }
  }, []);

  if (loading) return <ActivityIndicator />;
  if (errorMsg) return <Text>{errorMsg}</Text>;

  return (
    <View>
      {orders.map((order) => (
        <Text key={order.id}>{order.title}</Text>
      ))}
    </View>
  );
}
