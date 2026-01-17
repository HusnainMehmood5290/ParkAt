import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import IconInputField from "../components/IconInputField";
import Spinner from "../components/Spinner";
import DimensionInputContainer from "../components/DimensionInput"; // Import updated component
import DocumentUploadContainer from "../components/DocumentUploadContainer";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import validationSchema from "../constraints/YupRegisterVoSchema";
import { fireStoreDb } from "../configs/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RegisterVo = ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const RegisterVehicle = async (values) => {
    try {
      setIsLoading(true);

      const documentFile = values.document;

      const response = await fetch(documentFile.uri);
      const blob = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `vehicleDocuments/${documentFile.name}`);

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      // Prepare the vehicles data with the document URL
      const vehiclesData = {
        _ownerId: route.params,
        vehicleNumber: values.vehicleNumber,
        length: values.length,
        width: values.width,
        height: values.height,
        document: downloadURL, // Store the URL of the uploaded document
      };

      const vehiclesCollection = collection(fireStoreDb, "vehicles");
      const q = query(
        vehiclesCollection,
        where("vehicleNumber", "==", vehiclesData.vehicleNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Error: Vehicle with this number already exists.");
        setIsLoading(false);
      } else {
        const docRef = await addDoc(vehiclesCollection, vehiclesData);

        const userRef = doc(fireStoreDb, "users", route.params);

        // Fetch the current user document
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Update the registerType object while preserving existing fields
          const updatedRegisterType = {
            ...userData.registerType,
            vehicleowner: true, // Update vehicleowner field
          };

          await updateDoc(userRef, {
            isCompleteProfile: true,
            registerType: updatedRegisterType,
          });
        }

        setIsLoading(false);
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to register vehicle. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        vehicleNumber: "",
        length: "",
        width: "",
        height: "",
        document: null,
      }}
      validationSchema={validationSchema}
      onSubmit={RegisterVehicle}
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
          <Text style={styles.subHeader}>Vehicle Details</Text>

          <IconInputField
            placeholder="Vehicle Registration Number, LEX-1234"
            icon={require("../../assets/number.png")}
            value={values.vehicleNumber}
            onChangeText={handleChange("vehicleNumber")}
            onBlur={handleBlur("vehicleNumber")}
          />
          {touched.vehicleNumber && errors.vehicleNumber && (
            <Text style={styles.error}>{errors.vehicleNumber}</Text>
          )}
          <DimensionInputContainer
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />

          <DocumentUploadContainer
            text={"Enter Vehicle Documents"}
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

export default RegisterVo;
