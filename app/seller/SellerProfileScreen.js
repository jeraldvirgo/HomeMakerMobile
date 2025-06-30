import { ScrollView, DeviceEventEmitter } from "react-native";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { CustomLabel } from "../../components/CustomLabel";
import { CustomTextbox } from "../../components/CustomTextbox";
import { CustomAppImage } from "../../components/CustomAppImage";
import { CustomTextboxMultiLine } from "../../components/CustomTextboxMultiLine";
import {
  storeApplicationInfo,
  getApplicationInfo,
} from "../../constants/StoreInfo";
import { createBrand, createUser, updateUser } from "../network/HttpService";
export function SellerProfileScreen({ route, navigation }) {
  const { phoneNumber, OTP, isExistingUser } = route.params;
  console.debug("Received PhoneNumber", phoneNumber);
  console.debug("Received OTP", OTP);
  console.debug("Received isExistingUser", isExistingUser);
  const [userName, setUserName] = React.useState("");
  const [userBrandName, setUserBrandName] = React.useState("");
  const [userBrandDescription, setUserBrandDescription] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
  const [upiId, setUpiId] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState(
    "https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
  );
  let createdUserId = "";
  React.useEffect(() => {
    async function getProfileInfo() {
      setUserName(await getApplicationInfo("userName"));
      setAddress(await getApplicationInfo("address"));
      setUserId(await getApplicationInfo("userId"));
      setUserBrandName(await getApplicationInfo("userBrandName"));
      setUserBrandDescription(await getApplicationInfo("userBrandDescription"));
      setEmailId(await getApplicationInfo("emailId"));
      setUpiId(await getApplicationInfo("upiId"));
      setAvatarUrl(await getApplicationInfo("avatarUrl"));
    }
    if (isExistingUser) {
      console.debug("Is an Existing User !!!");
      getProfileInfo();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (isExistingUser) {
        const updateUserData = {
          id: createdUserId,
          userName: userName,
          mobileNumber: phoneNumber,
          address: address,
          email: emailId,
          avatarUrl: avatarUrl,
          upiId: upiId,
        };
        console.debug("updateUserData", updateUserData);
        createdUserId = await updateUser(updateUserData);
      } else {
        const createUserData = {
          userName: userName,
          mobileNumber: phoneNumber,
          address: address,
          email: emailId,
          avatarUrl: avatarUrl,
          upiId: upiId,
        };
        console.debug("createUserData", createUserData);
        createdUserId = await createUser(createUserData);
      }

      const createBrandData = {
        userId: createdUserId,
        brandName: userBrandName,
        brandImageUrl:
          "https://cdn3.vectorstock.com/i/1000x1000/78/67/home-food-symbol-vector-1957867.jpg",
        brandSubType: "veg",
        brandDescription: "userBrandDescription",
        brandDescriptionAdditional: "Additional Info",
        brandLocation: address,
        brandTimingOpen: "00.00",
        brandTimingClose: "00.00",
      };
      const createBrandResponse = await createBrand(
        createdUserId,
        createBrandData
      );
      await storeApplicationInfo("userId", createdUserId);
      await storeApplicationInfo("userName", userName);
      await storeApplicationInfo("phoneNumber", phoneNumber);
      await storeApplicationInfo("address", address);
      await storeApplicationInfo("userBrandName", userBrandName);
      await storeApplicationInfo("userBrandDescription", userBrandDescription);
      await storeApplicationInfo("emailId", emailId);
      await storeApplicationInfo("avatarUrl", avatarUrl);
      await storeApplicationInfo("upiId", upiId);

      DeviceEventEmitter.emit("event.login", "true");
      DeviceEventEmitter.emit("event.userType", "seller");
    } catch (error) {
      console.debug("Error from AsyncStorage", error);
    }
  };

  return (
    <ScrollView>
      <CustomAppImage />
      <CustomLabel title={"User Name"} />
      <CustomTextbox
        title={"Name"}
        type="default"
        value={userName}
        onChangeText={setUserName}
      ></CustomTextbox>

      <CustomLabel title={"Brand Name"} />
      <CustomTextbox
        title={"Brand Name"}
        type="default"
        value={userBrandName}
        onChangeText={setUserBrandName}
      ></CustomTextbox>

      <CustomLabel title={"Email Id"} />
      <CustomTextbox
        title={"Email Id"}
        type="default"
        value={emailId}
        onChangeText={setEmailId}
      ></CustomTextbox>

      <CustomLabel title={"Store Description"} />
      <CustomTextboxMultiLine
        title={"Store Description"}
        value={userBrandDescription}
        onChangeText={setUserBrandDescription}
      ></CustomTextboxMultiLine>

      <CustomLabel title={"Address"} />
      <CustomTextboxMultiLine
        title={"Address"}
        value={address}
        onChangeText={setAddress}
      ></CustomTextboxMultiLine>
      <CustomLabel title={"Payment UPI ID"} />
      <CustomTextbox
        title={"UPI ID"}
        type="default"
        value={upiId}
        onChangeText={setUpiId}
      ></CustomTextbox>
      <CustomButton onPress={handleSubmit} title={"Done"} />
    </ScrollView>
  );
}
