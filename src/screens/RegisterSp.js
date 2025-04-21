import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import IconInputField from "../components/IconInputField";
import Spinner from "../components/Spinner";
import DimensionInputContainer from "../components/DimensionInput";
import DocumentUploadContainer from "../components/DocumentUploadContainer";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import validationSchema from "../constraints/YupRegisterSpSchema";
import IconButton from "../components/IconButton";
import * as Location from "expo-location";
import LocationIconBlack from "../../assets/mapIcon.png";
import LocationIconGreen from "../../assets/greenLocation.png";
import { fireStoreDb } from "../configs/firebaseConfig";
import { collection, getDoc, addDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RegisterSp = ({ route }) => {
  const navigation = useNavigation();
  const [locationIcon, setLocationIcon] = useState(LocationIconBlack);
  const [currentLocation, setCurrentLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const RegisterSpace = async (values) => {
    try {
      setIsLoading(true);

      // Get the document file from values
      const documentFile = values.document;

      // Create a storage reference
      const storage = getStorage();
      const storageRef = ref(storage, `documents/${documentFile.name}`);

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, documentFile);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      // Prepare the space data with the document URL
      const spaceData = {
        _ownerId: route.params,
        ownerName: values.ownerName,
        length: values.length,
        width: values.width,
        height: values.height,
        document: downloadURL, // Store the URL of the uploaded document
        location: currentLocation,
      };

      const spacesCollection = collection(fireStoreDb, "spaces");

      const docRef = await addDoc(spacesCollection, spaceData);

      const userRef = doc(fireStoreDb, "users", route.params);

      // Fetch the current user document
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Update the registerType object while preserving existing fields
        const updatedRegisterType = {
          ...userData.registerType,
          spaceprovider: true, // Update spaceprovider field
        };

        await updateDoc(userRef, {
          isCompleteProfile: true,
          registerType: updatedRegisterType,
        });

        console.log(`User data updated for ID: ${route.params}`);
      } else {
        console.log("No such document!");
      }

      console.log(`Space data stored with ID: ${docRef.id}`);
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      console.log("ERROR STORING SPACE: " + error.message);
      setIsLoading(false);
    }
  };

  const findLocation = async (setFieldValue) => {
    // Request permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    setFieldValue("location", "Finding Location...");
    // Get the current location
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    setCurrentLocation(location);
    setFieldValue("location", "Done");
    setLocationIcon(LocationIconGreen);
    console.log(location);
  };

  return (
    <Formik
      initialValues={{
        ownerName: "",
        length: "",
        width: "",
        height: "",
        document: null,
        address: "",
        location: "Set your location",
      }}
      validationSchema={validationSchema}
      onSubmit={RegisterSpace}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.header}>Register with ParkAt</Text>
          <Text style={styles.subHeader}>Parking Details</Text>

          <IconInputField
            placeholder="Owner Name"
            icon={require("../../assets/name.png")}
            value={values.ownerName}
            onChangeText={handleChange("ownerName")}
            onBlur={handleBlur("ownerName")}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.error}>{errors.ownerName}</Text>
          )}

          <IconButton
            text={values.location}
            icon={locationIcon}
            iconDirection={"left"}
            onPress={() => findLocation(setFieldValue)}
          />
          {touched.location && errors.location && (
            <Text style={styles.error}>{errors.location}</Text>
          )}

          <DimensionInputContainer
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />

          <DocumentUploadContainer
            text={"Enter Space Documents"}
            setFieldValue={setFieldValue}
          />

          {touched.document && errors.document && (
            <Text style={styles.error}>{errors.document}</Text>
          )}
          <Spinner
            text="Register Account"
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default RegisterSp;
