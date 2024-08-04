import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../constants/Colors";

export const CustomTextbox = (props) => {
  return (
    <TextInput
      style={styles.input}
      value={props.value}
      keyboardType={props.type}
      placeholder={props.title}
      onChangeText={props.onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: COLORS.TEXTBOX_BORDER,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  baseText: {
    fontFamily: "Cochin",
  },
});
