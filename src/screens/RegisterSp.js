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
import { supabase } from "../configs/supabaseConfig";

const RegisterSp = ({ route }) => {
  const navigation = useNavigation();
  const [locationIcon, setLocationIcon] = useState(LocationIconBlack);
  const [currentLocation, setCurrentLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const RegisterSpace = async (values) => {
    try {
      setIsLoading(true);

      const documentFile = values.document;
      const fileExt = documentFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `spaceDocuments/${fileName}`;

      const response = await fetch(documentFile.uri);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, arrayBuffer, {
          contentType: documentFile.mimeType || 'application/pdf',
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      const spaceData = {
        ownerId: route.params,
        ownerName: values.ownerName,
        length: values.length,
        width: values.width,
        height: values.height,
        document: publicUrl,
        location: currentLocation,
      };

      const { error: insertError } = await supabase
        .from('spaces')
        .insert([spaceData]);

      if (insertError) throw insertError;

      const { data: userData, error: getUserError } = await supabase
        .from('users')
        .select('registerType')
        .eq('id', route.params)
        .single();

      if (!getUserError && userData) {
        const updatedRegisterType = {
          ...userData.registerType,
          spaceprovider: true,
        };

        await supabase
          .from('users')
          .update({
            isCompleteProfile: true,
            registerType: updatedRegisterType,
          })
          .eq('id', route.params);
      }

      setIsLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to register space. Please try again.");
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
