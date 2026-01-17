import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import IconInputField from "../components/IconInputField";
import Spinner from "../components/Spinner";
import DimensionInputContainer from "../components/DimensionInput"; // Import updated component
import DocumentUploadContainer from "../components/DocumentUploadContainer";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import validationSchema from "../constraints/YupRegisterVoSchema";
import { supabase } from "../configs/supabaseConfig";

const RegisterVo = ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const RegisterVehicle = async (values) => {
    try {
      setIsLoading(true);

      const documentFile = values.document;
      const fileExt = documentFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `vehicleDocuments/${fileName}`;

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

      const vehiclesData = {
        ownerId: route.params,
        vehicleNumber: values.vehicleNumber,
        length: values.length,
        width: values.width,
        height: values.height,
        document: publicUrl,
      };

      const { data: existing, error: checkError } = await supabase
        .from('vehicles')
        .select('id')
        .eq('vehicleNumber', vehiclesData.vehicleNumber)
        .maybeSingle();

      if (existing) {
        Alert.alert("Error", "Vehicle with this number already exists.");
        setIsLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('vehicles')
        .insert([vehiclesData]);

      if (insertError) throw insertError;

      const { data: userData, error: getUserError } = await supabase
        .from('users')
        .select('registerType')
        .eq('id', route.params)
        .single();

      if (!getUserError && userData) {
        const updatedRegisterType = {
          ...userData.registerType,
          vehicleowner: true,
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
