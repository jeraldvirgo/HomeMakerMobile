import React from "react";
import { StyleSheet, TextInput } from "react-native";

export const CustomTextboxMultiLine = (props) => {
  return (
    <TextInput
      style={styles.input}
      keyboardType="default"
      placeholder={props.title}
      value={props.value}
      multiline={true}
      onChangeText={props.onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 80,
    margin: 10,
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: "left",
  },
});
