import React from "react";
import { StyleSheet, Text } from "react-native";

export const CustomLabel = (props) => {
  return <Text style={styles.label}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  label: {
    paddingLeft: 10,
    textAlign: "left",
    fontWeight: "normal",
    fontSize: 15,
  },
});
