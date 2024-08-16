import { View, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { CustomLabel } from "../../components/CustomLabel";
import { CustomTextbox } from "../../components/CustomTextbox";
import { CustomAppImage } from "../../components/CustomAppImage";
import {
  validateOTP,
  isExistingUser,
  getUserType,
} from "../network/HttpService";

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
      const userType = await getUserType(phoneNumber);
      const isExtUser = await isExistingUser(phoneNumber);
      console.debug("Existing User", isExtUser);
      console.debug("User Type", userType);
      setLoading(false);
      if (userType === "buyer") {
        navigation.navigate("Profile", {
          phoneNumber: phoneNumber,
          OTP: otp,
          isExistingUser: isExtUser,
        });
      }
      if (userType === "seller") {
        navigation.navigate("SellerProfile", {
          phoneNumber: phoneNumber,
          OTP: otp,
          isExistingUser: isExtUser,
        });
      }
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
