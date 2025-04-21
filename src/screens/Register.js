import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import IconInputField from "../components/IconInputField";
import Spinner from "../components/Spinner";
import { Formik } from "formik";
import YupRegisterSchema from "../constraints/YupRegisterSchema";
import ErrorText from "../components/ErrorText";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireStoreDb, firebaseAuth } from "../configs/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

const Register = () => {
  const navigation = useNavigation();
  const [callVhOwner, setCallVhOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isCompleteProfile, setIsCompleteProfile] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Reset states when screen comes into focus
      setCallVhOwner(false);
      setIsLoading(false);
      // setIsCompleteProfile(false);
    }, [])
  );

  const SignUp = async (values) => {
    try {
      setIsLoading(true);

      const users = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );

      const userData = {
        _id: users.user.uid,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        cnic: values.cnic,
        phone: values.phone,
        registerType: { vehicleowner: false, spaceprovider: false },
        isCompleteProfile: false,
      };

      const docRef = doc(fireStoreDb, "users", users.user.uid);
      await setDoc(docRef, userData);

      navigateBasedOnRole(userData._id);
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        const usersRef = collection(fireStoreDb, "users");
        const q = query(usersRef, where("email", "==", values.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          navigateBasedOnRole(userData._id);
        }
      }
    }
  };

  const navigateBasedOnRole = (userId) => {
    if (callVhOwner) {
      navigation.navigate("Register Vehicle", userId);
    } else {
      navigation.navigate("Register Space", userId);
    }
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        cnic: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
      }}
      onSubmit={SignUp}
      validationSchema={YupRegisterSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <ScrollView style={{ width: "100%" }}>
            <Text style={styles.header}>Register with ParkAt</Text>
            <Text style={styles.subHeader}>Personal Details</Text>
            <IconInputField
              placeholder="Enter First Name"
              icon={require("../../assets/name.png")}
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
            />
            {errors.firstName && <ErrorText msg={errors.firstName} />}
            <IconInputField
              placeholder="Enter Last Name"
              icon={require("../../assets/name.png")}
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
            />
            {errors.lastName && <ErrorText msg={errors.lastName} />}
            <IconInputField
              placeholder="Enter Your Email"
              icon={require("../../assets/email.png")}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {errors.email && <ErrorText msg={errors.email} />}
            <IconInputField
              placeholder="Phone Number"
              icon={require("../../assets/pak.png")}
              value={values.phone}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              keyboardType="numeric"
            />
            {errors.phone && <ErrorText msg={errors.phone} />}
            <IconInputField
              placeholder="CNIC Number"
              icon={require("../../assets/cnic.png")}
              value={values.cnic}
              onChangeText={handleChange("cnic")}
              onBlur={handleBlur("cnic")}
              keyboardType="numeric"
            />
            {errors.cnic && <ErrorText msg={errors.cnic} />}
            <IconInputField
              placeholder="Password"
              icon={require("../../assets/password.png")}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            {errors.password && <ErrorText msg={errors.password} />}
            <IconInputField
              placeholder="Confirm Password"
              icon={require("../../assets/confirm.png")}
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <ErrorText msg={errors.confirmPassword} />
            )}
            <Spinner
              text="Continue as Vehicle Owner"
              onPress={() => {
                if (
                  !errors.firstName &&
                  !errors.lastName &&
                  !errors.email &&
                  !errors.cnic &&
                  !errors.password &&
                  !errors.confirmPassword
                ) {
                  setCallVhOwner(true);
                  handleSubmit();
                  // navigation.navigate("Register Vehicle", values);
                }
              }}
              isLoading={isLoading}
            />

            <Spinner
              text="Continue as Space Provider"
              onPress={() => {
                if (
                  !errors.firstName &&
                  !errors.lastName &&
                  !errors.email &&
                  !errors.cnic &&
                  !errors.password &&
                  !errors.confirmPassword
                ) {
                  setCallVhOwner(false);
                  handleSubmit();
                  // navigation.navigate("Register Space", values);
                }
              }}
              isLoading={isLoading}
            />
          </ScrollView>
          <View style={styles.footerContainer}>
            <Text style={styles.footer}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
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
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
  },
  footer: {
    fontSize: 14,
    color: "#0B460A",
    textAlign: "center",
    marginTop: 20,
  },
  login: {
    textDecorationLine: "underline",
    color: "#8FB552",
    marginTop: 19,
  },
});

export default Register;
