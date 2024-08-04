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
import { createUser, updateUser } from "../network/HttpService";
export function ProfileScreen({ route, navigation }) {
  const { phoneNumber, OTP, isExistingUser } = route.params;
  console.debug("Received PhoneNumber", phoneNumber);
  console.debug("Received OTP", OTP);
  console.debug("Received isExistingUser", isExistingUser);
  const [userName, setUserName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    async function getProfileInfo() {
      setUserName(await getApplicationInfo("userName"));
      setAddress(await getApplicationInfo("address"));
      setUserId(await getApplicationInfo("userId"));
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
          id: userId,
          userName: userName,
          mobileNumber: phoneNumber,
          address: address,
          email: "dummy@gmail.com",
          avatarUrl: "Someurl",
        };
        console.debug("updateUserData", updateUserData);
        const updateUserResponse = updateUser(updateUserData);
        console.debug("Update User Response", updateUserResponse);
      } else {
        const createUserData = {
          userName: userName,
          mobileNumber: phoneNumber,
          address: address,
          email: "dummy@gmail.com",
          avatarUrl: "Someurl",
        };
        console.debug("createUserData", createUserData);
        const createdUserResponse = createUser(createUserData);
        console.debug("Create User Response", createdUserResponse);
      }

      await storeApplicationInfo("userName", userName);
      await storeApplicationInfo("phoneNumber", phoneNumber);
      await storeApplicationInfo("address", address);
      DeviceEventEmitter.emit("event.login", "true");
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
      <CustomLabel title={"Address"} />
      <CustomTextboxMultiLine
        title={"Address"}
        value={address}
        onChangeText={setAddress}
      ></CustomTextboxMultiLine>
      <CustomButton onPress={handleSubmit} title={"Done"} />
    </ScrollView>
  );
}
