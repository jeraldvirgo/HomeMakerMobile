import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { COLORS } from "../constants/Colors";

export const CustomAppImage = (props) => {
  return (
    <View style={styles.appLogo}>
      <Image
        source={require("../assets/app-icon.png")}
        style={styles.imageSize}
      />
    </View>
  );
};
export const CustomProfileImage = (props) => {
  return (
    <Image
      source={require("../assets/user.png")}
      style={{ width: 30, height: 30 }}
    />
  );
};
export const CapturePreviewImage = (props) => {
  return props.uri != "" ? (
    <View style={styles.appLogo}>
      <Image source={{ uri: props.uri }} style={styles.imageSize} />
    </View>
  ) : (
    <View style={styles.appLogo}>
      <Image
        source={require("../assets/captureImage.png")}
        style={styles.imageSize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appLogo: {
    alignItems: "center",
    alignItems: "center",
    resizeMode: "center",
  },
  imageSize: {
    width: 250,
    height: 250,
    // borderWidth: 2,
  },
});
