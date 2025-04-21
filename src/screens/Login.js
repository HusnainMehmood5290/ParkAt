import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import IconInputField from "../components/IconInputField";
import { fireStoreDb, firebaseAuth } from "../configs/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "../components/Spinner";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ErrorText from "../components/ErrorText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "firebase/database";

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [userData, setUserData] = useState("");
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userCreds = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = await getDoc(doc(fireStoreDb, "users", userCreds.user.uid));

      if (user.exists()) {
        const userData = user.data();
        setUserData(userData);
        setIsLoading(false);
        setEmailError(false);

        if (userData.isCompleteProfile) {
          const isVehicleOwner = userData.registerType.vehicleowner;
          const isSpaceProvider = userData.registerType.spaceprovider;

          await AsyncStorage.multiSet([
            ["email", userData.email],
            ["cnic", userData.cnic],
            ["_id", userData._id],
            ["isVehicleOwner", JSON.stringify(isVehicleOwner)],
            ["isSpaceProvider", JSON.stringify(isSpaceProvider)],
          ]);
          // console.log(userData.registerType);
        }

        let routeName = "Registration";
        if (userData.registerType.vehicleowner) {
          routeName = "HomeVo";
        } else if (userData.registerType.spaceprovider) {
          routeName = "HomeSp";
        }
        navigation.navigate(routeName);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setEmailError(
        error.message.includes("auth/invalid-credential") ||
          error.message.includes("auth/invalid-email")
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login To Your Account</Text>

      <IconInputField
        placeholder="Enter Your Email"
        icon={require("../../assets/email.png")}
        value={email}
        onChangeText={setEmail}
      />

      <IconInputField
        placeholder="Enter your Password"
        icon={require("../../assets/password.png")}
        value={password}
        onChangeText={setPassword}
      />

      {emailError && (
        <ErrorText msg="Invalid email or password try again or signup" />
      )}
      <Spinner text={"Login"} isLoading={isLoading} onPress={handleLogin} />

      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Not Have Account Yet? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text style={styles.signUp}>Signup Here</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  signUp: {
    textDecorationLine: "underline",
    color: "#8FB552",
    marginTop: 19,
  },
});

export default Login;
