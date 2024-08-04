import { View, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { CustomLabel } from "../../components/CustomLabel";
import { CustomTextbox } from "../../components/CustomTextbox";
import { CustomAppImage } from "../../components/CustomAppImage";
import { validateOTP, isExistingUser } from "../network/HttpService";

export function OtpScreen({ route, navigation }) {
  const { phoneNumber } = route.params;
  console.debug("Received PhoneNumber", phoneNumber);
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const status = await validateOTP(phoneNumber, otp);
    console.log("OTP Verification Status", status);
    if (status) {
      const isExtUser = await isExistingUser(phoneNumber);
      console.debug("Existing User", isExtUser);
      setLoading(false);
      navigation.navigate("Profile", {
        phoneNumber: phoneNumber,
        OTP: otp,
        isExistingUser: isExtUser,
      });
    } else {
      console.error("OTP Verification Failed");
    }
  };
  return (
    <ScrollView>
      <CustomAppImage />
      <CustomLabel title={"We Sent OTP to verify"} />
      <CustomTextbox
        title={"OTP"}
        type="number-pad"
        onChangeText={setOtp}
      ></CustomTextbox>
      <CustomButton onPress={handleSubmit} title={"Next"} />
      {loading ? <ActivityIndicator size="large" /> : null}
    </ScrollView>
  );
}
