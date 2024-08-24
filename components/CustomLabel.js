import React from "react";
import { StyleSheet, Text } from "react-native";

export const CustomLabel = (props) => {
  return <Text style={styles.label}>{props.title}</Text>;
};

export const CustomBoldLabel = (props) => {
  return <Text style={styles.boldLabel}>{props.title}</Text>;
};

export const CustomBoldStockLable = (props) => {
  return <Text style={styles.boldStockLabel}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  label: {
    paddingLeft: 10,
    textAlign: "left",
    fontWeight: "normal",
    fontSize: 15,
  },
  boldLabel: {
    paddingLeft: 10,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
  },
  boldStockLabel: {
    paddingLeft: 10,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 13,
  },
});
