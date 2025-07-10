import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { CustomLabel } from "../../components/CustomLabel";
import { CustomTextbox } from "../../components/CustomTextbox";
import { CustomButton } from "../../components/CustomButton";
import { CustomSwitch } from "../../components/CustomSwitch";
import { CapturePreviewImage } from "../../components/CustomAppImage";
import { getApplicationInfo } from "../../constants/StoreInfo";
import { Products } from "../data/Products";
import { createProduct, uploadFileFromUri } from "../network/HttpService";

export function CreateProductScreen({ route, navigation }) {
  const [brandId, setBrandId] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productAdditionalDescription, setProductAdditionalDescription] =
    React.useState("");
  const [productPrice, setProductPrice] = React.useState("");

  let imageUriLocal = "";
  try {
    const { imageUri } = route.params;
    imageUriLocal = imageUri;
    console.log("imageUri", imageUriLocal);
  } catch (e) {
    console.log("Error On Load: ", e);
  }

  React.useEffect(() => {
    async function loadInfo() {
      console.debug("Loading BrandIfo", await getApplicationInfo("brandId"));
      setBrandId(await getApplicationInfo("brandId"));
      console.debug("Loading BrandIfo", brandId);
    }
    loadInfo();
  }, []);

  const handleCamera = async () => {
    navigation.navigate("CameraViewScreen");
  };
  const handleAddProduct = async () => {
    let uploadImageUrl = await uploadFileFromUri({
      fileUri: imageUriLocal,
      fileName: "productImage.jpg",
      mimeType: "image/jpeg",
    });
    console.debug("Upload Image URL", uploadImageUrl);
    const updateUserData: Products = {
      brandId: Number(brandId),
      productName: productName,
      productDescription: productName,
      productDescriptionAdditional: productAdditionalDescription,
      productPrice: Number(productPrice),
      type: isEnabled ? "Non-Veg" : "Veg",
      productImageUrl: uploadImageUrl,
    };
    console.log("Create Product Info ", updateUserData);

    let prod = await createProduct(updateUserData);
    console.debug("Product Created", prod);
    navigation.pop();
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
          onPress={handleCamera}
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
          onChangeText={setProductDescription}
        ></CustomTextbox>
        <CustomLabel title={"Product Additional Description"} />
        <CustomTextbox
          title={"Product Additional Description"}
          type="default"
          onChangeText={setProductAdditionalDescription}
        ></CustomTextbox>
        <CustomLabel title={"Product Price"} />
        <CustomTextbox
          title={"Price"}
          type="number-pad"
          onChangeText={setProductPrice}
        ></CustomTextbox>
        <CustomSwitch
          onValueChange={toggleSwitch}
          value={isEnabled}
          colorValue={isEnabled}
          title="Veg/Non-Veg"
        ></CustomSwitch>
        <CustomButton onPress={handleAddProduct} title={"Add Product"} />
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
