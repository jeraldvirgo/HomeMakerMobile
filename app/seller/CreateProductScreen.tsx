import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { CustomLabel } from "../../components/CustomLabel";
import { CustomTextbox } from "../../components/CustomTextbox";
import { CustomButton } from "../../components/CustomButton";
import { CustomSwitch } from "../../components/CustomSwitch";
import {
  CapturePreviewImage,
  CustomAppImage,
} from "../../components/CustomAppImage";

export function CreateProductScreen({ route, navigation }) {
  let imageUriLocal = "";
  try {
    const { imageUri } = route.params;
    imageUriLocal = imageUri;
    console.log("imageUri", imageUriLocal);
  } catch (e) {
    // console.log("Error On Load: ", e);
  }

  const [productName, setProductName] = React.useState("");

  const handleSubmit = async () => {
    navigation.navigate("CameraViewScreen");
  };
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <ScrollView>
      <View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CapturePreviewImage uri={imageUriLocal} />
        </TouchableOpacity>
        <CustomLabel title={"Product Name"} />
        <CustomTextbox
          title={"Product Name"}
          type="default"
          onChangeText={setProductName}
        ></CustomTextbox>
        <CustomLabel title={"Product Description"} />
        <CustomTextbox
          title={"Product Description"}
          type="default"
          onChangeText={setProductName}
        ></CustomTextbox>
        <CustomLabel title={"Product Additional Description"} />
        <CustomTextbox
          title={"Product Additional Description"}
          type="default"
          onChangeText={setProductName}
        ></CustomTextbox>
        <CustomLabel title={"Product Price"} />
        <CustomTextbox
          title={"Price"}
          type="number-pad"
          onChangeText={setProductName}
        ></CustomTextbox>
        <CustomSwitch
          onValueChange={toggleSwitch}
          value={isEnabled}
          colorValue={isEnabled}
        ></CustomSwitch>
        <CustomButton onPress={handleSubmit} title={"Add Product"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
