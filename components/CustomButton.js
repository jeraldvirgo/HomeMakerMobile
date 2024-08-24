import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/Colors";
export const CustomButton = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.BUTTON,
    padding: 10,
    borderRadius: 30,
    fontWeight: "normal",
    fontSize: 20,
    margin: 10,
  },
});
