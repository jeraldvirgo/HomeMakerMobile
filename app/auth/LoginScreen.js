import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { CustomLabel } from "../../components/CustomLabel";
import { CustomTextbox } from "../../components/CustomTextbox";
import { CustomAppImage } from "../../components/CustomAppImage";
export function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const handleImageSubmit = async () => {
    console.debug("Next Pressed", phoneNumber);
    navigation.navigate("OTP", { phoneNumber: phoneNumber });
  };
  return (
    <View>
      <View style={styles.imageContainer}>
        <CustomAppImage />
      </View>
      <View style={styles.textContainer}>
        <CustomLabel title={"Enter Mobile Number and Login"} />
        <CustomTextbox
          title={"Mobile Number"}
          type="number-pad"
          onChangeText={setPhoneNumber}
        ></CustomTextbox>
        <CustomButton onPress={handleImageSubmit} title={"Next"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: "60%",
  },
  textContainer: {
    height: "20%",
  },
});
