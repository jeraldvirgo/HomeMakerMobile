import { View, Switch, Text, StyleSheet } from "react-native";

export const CustomSwitch = (props) => {
  return (
    <View style={styles.switchContainer}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={props.colorValue ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onValueChange}
        value={props.value}
      />
      <Text style={styles.textStyle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "justify",
    paddingTop: 13,
  },
});
