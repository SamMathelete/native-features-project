import React, { FC, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";

const ImagePicker: FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuficient Permissions!",
        "You need to grant camera permissions to use this app,"
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const permissionStatus = await verifyPermissions();
    if (!permissionStatus) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(image.assets![0].uri);
  };

  let imagePicked = <Text>No Image taken yet.</Text>;
  if (image) {
    imagePicked = <Image style={styles.imageStyle} source={{ uri: image }} />;
  }
  return (
    <View>
      <View style={styles.imagePicked}>{imagePicked}</View>
      <Button onPress={takeImageHandler} title="Take Image" />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePicked: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
