import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { COLORS } from "../../constants/Colors";
import { CustomBoldLabel, CustomLabel } from "../../components/CustomLabel";
import { DataTable } from "react-native-paper";

export function SellerOrdersScreen() {
  let items = [
    {
      brandId: 1,
      count: 1,
      id: 1,
      productDescription: "Pure Homemade Food",
      productDescriptionAdditional: "Veg",
      productImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0GXIb59Wp5ZqKvZiaH0xDF6PgVOzR4yWGMFnmudskHQ&s",
      productName: "Biriyani",
      productPrice: 100,
    },
    {
      brandId: 1,
      count: 1,
      id: 2,
      productDescription: "Pure Homemade Food",
      productDescriptionAdditional: "Veg",
      productImageUrl:
        "https://img.freepik.com/premium-photo/small-bowl-roti-is-white-background_871710-681.jpg",
      productName: "Roti",
      productPrice: 50,
    },
    {
      brandId: 1,
      count: 1,
      id: 3,
      productDescription: "Pure Homemade Food",
      productDescriptionAdditional: "Veg",
      productImageUrl:
        "https://i.pinimg.com/736x/dc/7b/fc/dc7bfcc37d554d31dc752135cbc444b5.jpg",
      productName: "Samosa",
      productPrice: 50,
    },
  ];
  return (
    <>
      <View style={styles.buttonContainer}>
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
      </View>
      <View style={styles.card}>
        <CustomLabel title={"Name: Jerald Philip"}></CustomLabel>
        <CustomLabel title={"Address: L775, Plumeria"}></CustomLabel>
        <CustomLabel title={"Mobile: +919538249333"}></CustomLabel>
        <View style={styles.orderValue}>
          <CustomBoldLabel title={"Order Value : 750/-"}></CustomBoldLabel>
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
            {items.slice(0, items.length).map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.productName}</DataTable.Cell>
                <DataTable.Cell>{item.count}</DataTable.Cell>
                <DataTable.Cell>{item.productPrice}</DataTable.Cell>
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
});
