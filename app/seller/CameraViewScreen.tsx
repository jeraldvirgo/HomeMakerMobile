import { View, StyleSheet, Text, Button, Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef } from "react";
import { CustomButton } from "../../components/CustomButton";
export function CameraViewScreen({ route, navigation }) {
  const [facing, setFacing] = React.useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturePreview, setCapturePreview] = React.useState(false);
  const [capturePreviewUrl, setCapturePreviewUrl] = React.useState<any>();
  const cameraRef = useRef<CameraView>(null);

  async function takePicture() {
    // setFacing((current) => (current === "back" ? "front" : "back"));
    let photo = await cameraRef.current.takePictureAsync();
    setCapturePreviewUrl(photo.uri);
    setCapturePreview(true);
    console.log(photo.uri);
  }
  async function retake() {
    setCapturePreviewUrl(null);
    setCapturePreview(false);
  }
  async function captureOk() {
    console.log("Success of capture image");
    const { launchFrom } = route.params;
    if (launchFrom === "CreateProductScreen") {
      navigation.navigate("CreateProductScreen", {
        imageUri: capturePreviewUrl,
      });
    }
    if (launchFrom === "SellerProfileScreen") {
      navigation.navigate("SellerProfile", {
        imageUri: capturePreviewUrl,
      });
    }
  }

  if (!permission) {
    return (
      <View>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.cameraContainer}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  return capturePreview ? (
    <View style={styles.previewContainer}>
      <Image
        source={{ uri: capturePreviewUrl }}
        style={styles.cameraContainer}
        resizeMode="contain"
      />
      <View>
        <CustomButton onPress={captureOk} title={"Ok"} />
        <CustomButton onPress={retake} title={"Retake"} />
      </View>
    </View>
  ) : (
    <View style={styles.cameraContainer}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.button}>
          <CustomButton onPress={takePicture} title={"Click"} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
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
  button: {
    flex: 1,
    flexDirection: "column-reverse",
    paddingHorizontal: 170,
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
  },
  previewBackgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
});
