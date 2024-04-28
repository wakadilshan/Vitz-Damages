import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native";
import Recent from "./recent";
import { UploadMethod } from "../../../constants/types";

const color = colors;

const growth = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>(null);
  const screenWidth = Dimensions.get("window").width;
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(null);

  const pickImage = async () => {
    const imagePickerOpts: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };

    let result = await ImagePicker.launchImageLibraryAsync(imagePickerOpts);

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const ImageUploader = () => {
    return (
      <View
        style={{
          width: "100%",
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                uploadMethod === "single" ? color.accent_high : "white",
              padding: 10,
              borderRadius: 20,
              width: 140,
            }}
            onPress={() => setUploadMethod("single")}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: uploadMethod === "single" ? "white" : color.dark,
                textAlign: "center",
              }}
            >
              Single Mushroom
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor:
                uploadMethod === "multi" ? color.accent_high : "white",
              padding: 10,
              borderRadius: 20,
              width: 140,
            }}
            onPress={() => setUploadMethod("multi")}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: uploadMethod === "multi" ? "white" : color.dark,
                textAlign: "center",
              }}
            >
              Multiple Mushroooms
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.uploaderContainer}
          disabled={uploadMethod === null}
          onPress={pickImage}
        >
          <Ionicons
            size={18}
            name={uploadMethod ? "cloud-upload" : "checkbox"}
            color={color.dark}
          />
          {uploadMethod ? (
            <Text
              style={{
                color: color.dark,
              }}
            >
              Upload an image containing{" "}
              {uploadMethod === "single" && "single mushroom"}
              {uploadMethod === "multi" && "multiple mushrooms"}.
            </Text>
          ) : (
            <Text
              style={{
                color: color.dark,
              }}
            >
              Please select an upload method!
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const ImageViewer = () => {
    return (
      <View style={styles.uploadedImageViewer}>
        <Text
          style={{
            fontWeight: "500",
          }}
        >
          Uploader
        </Text>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: 200,
          }}
        >
          <Image
            source={{
              //uri: "https://miro.medium.com/v2/resize:fit:800/1*10eqlHbFIBsS-nr17FkH9g.png",
              uri: image.uri,
            }}
            style={{
              flex: 1,
              width: "100%",
              height: 200,
              resizeMode: "cover",
              borderRadius: 10,
            }}
          />
          <TouchableOpacity style={{ position: "absolute", right: 3, top: 3 }}>
            <Ionicons
              name="ios-close-circle"
              size={20}
              onPress={() => setImage(null)}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 6,
            backgroundColor: color.accent_high,
            borderRadius: 5,
          }}
          activeOpacity={0.5}
        >
          <Text style={{ textAlign: "center", color: color.primary }}>
            Predict
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!image && <Recent />}
      {image ? <ImageViewer /> : <ImageUploader />}
    </View>
  );
};

export default growth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: color.primary,
    paddingTop: 50,
    gap: 10,
  },
  uploaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    height: 150,
    borderColor: color.dark,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  uploadedImageViewer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 20,
    minHeight: 400,
    gap: 10,
  },
});
