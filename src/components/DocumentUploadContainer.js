import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

function DocumentUploaderContainer({ text, setFieldValue }) {
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    // console.log("Attached file:", attachedFile);
    if (attachedFile) {
      setFieldValue("document", attachedFile);
    }
  }, [attachedFile, setFieldValue]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      // console.log("Result:", result);
      if (result && result.assets && result.assets.length > 0) {
        setAttachedFile(result.assets[0]);
        // console.log("Attached file:", attachedFile);
      }
    } catch (err) {
      // console.log("Error:", err);
      Alert.alert("Error", "Failed to pick document.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <HeaderTitle title={text} />
        <Divider />
        <TouchableOpacity onPress={pickDocument}>
          <DocumentImage />
          {attachedFile && (
            <Text style={styles.attachmentText}>
              {attachedFile ? attachedFile.name : ""}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const HeaderTitle = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const DocumentImage = () => (
  <Image
    resizeMode="cover"
    source={require("../../assets/upload.png")}
    style={styles.documentImage}
  />
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 13,
    color: "#000",
    fontWeight: "400",
  },
  card: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    paddingVertical: 20,
    paddingBottom: 50,
  },
  headerContainer: {
    width: "100%",
  },
  text: {
    // fontFamily: "Inter, sans-serif",
  },
  divider: {
    backgroundColor: "#000",
    height: 1,
    marginTop: 9,
    width: "100%",
  },
  documentImage: {
    alignSelf: "center",
    marginTop: 34,
    width: 60,
    height: 60, // Assuming square images with aspectRatio of 1
  },
  attachmentText: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DocumentUploaderContainer;
