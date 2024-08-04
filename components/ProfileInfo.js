import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { COLORS } from "../constants/Colors";

export const ProfileInfo = (props) => {
  return (
    <Image
      style={styles.image}
      source={require("../assets/user.png")}
      resizeMode={"cover"}
    />
  );
};
export const CustomProfileImage = (props) => {
  return (
    <View style={styles.profileLogo}>
      <Image source={require("../assets/user.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  appLogo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
  },
  profileLogo: {
    alignItems: "center",
    resizeMode: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderColor: COLORS.TEXTBOX_BORDER,
    borderRadius: 75,
    borderWidth: 1,
  },
});
