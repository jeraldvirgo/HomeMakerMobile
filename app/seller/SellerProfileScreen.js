import {
  ScrollView,
  DeviceEventEmitter,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { CustomLabel } from "../../components/CustomLabel";
import { CustomTextbox } from "../../components/CustomTextbox";
import { CustomAppImage } from "../../components/CustomAppImage";
import { CustomTextboxMultiLine } from "../../components/CustomTextboxMultiLine";
import { CapturePreviewImage } from "../../components/CustomAppImage";
import {
  storeApplicationInfo,
  getApplicationInfo,
} from "../../constants/StoreInfo";
import {
  createBrand,
  createUser,
  updateUser,
  uploadFileFromUri,
} from "../network/HttpService";
export function SellerProfileScreen({ route, navigation }) {
  const { phoneNumber, OTP, isExistingUser } = route.params;
  let imageUriLocal = "";
  let phoneNumberLocal = "";
  let OTPLocal = "";
  let isExistingUserLocal = false;
  try {
    const { imageUri } = route.params;
    if (imageUri !== undefined) {
      imageUriLocal = imageUri;
      console.log("imageUri", imageUriLocal);
      if (phoneNumber !== undefined) {
        phoneNumberLocal = phoneNumber;
      }
      if (OTP !== undefined) {
        OTPLocal = OTP;
      }
      if (isExistingUser !== undefined) {
        isExistingUserLocal = isExistingUser;
      }
    }
  } catch (e) {
    console.log("Error On Load: ", e);
  }
  console.debug("Received PhoneNumber", phoneNumberLocal);
  console.debug("Received OTP", OTPLocal);
  console.debug("Received isExistingUser", isExistingUserLocal);
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
    if (!isExistingUserLocal) {
      console.debug("Is an Existing User !!!");
      getProfileInfo();
    }
  }, []);

  const handleCamera = async () => {
    navigation.navigate("CameraViewScreen", {
      launchFrom: "SellerProfileScreen",
    });
  };

  const handleSubmit = async () => {
    try {
      if (isExistingUserLocal) {
        const updateUserData = {
          id: createdUserId,
          userName: userName,
          mobileNumber: phoneNumberLocal,
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
          mobileNumber: phoneNumberLocal,
          address: address,
          email: emailId,
          avatarUrl: avatarUrl,
          upiId: upiId,
        };
        console.debug("createUserData", createUserData);
        createdUserId = await createUser(createUserData);
      }

      let uploadImageUrl = await uploadFileFromUri({
        fileUri: imageUriLocal,
        fileName: "productImage.jpg",
        mimeType: "image/jpeg",
      });
      console.debug("Upload Image URL", uploadImageUrl);

      const createBrandData = {
        userId: createdUserId,
        brandName: userBrandName,
        brandImageUrl: uploadImageUrl,
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
      await storeApplicationInfo("phoneNumber", phoneNumberLocal);
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
      <View>
        <TouchableOpacity
          onPress={handleCamera}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CapturePreviewImage uri={imageUriLocal} />
        </TouchableOpacity>
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
      </View>
    </ScrollView>
  );
}
