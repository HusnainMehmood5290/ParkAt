import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import IconInputField from "../components/IconInputField";
import { supabase } from "../configs/supabaseConfig";
import Spinner from "../components/Spinner";
import { useNavigation } from "@react-navigation/native";
import ErrorText from "../components/ErrorText";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (dbError) throw dbError;

      if (userData) {
        setUserData(userData);
        setIsLoading(false);
        setEmailError(false);

        if (userData.isCompleteProfile) {
          const isVehicleOwner = userData.registerType?.vehicleowner || false;
          const isSpaceProvider = userData.registerType?.spaceprovider || false;

          await AsyncStorage.multiSet([
            ["email", userData.email],
            ["cnic", userData.cnic || ""],
            ["_id", userData.id],
            ["isVehicleOwner", JSON.stringify(isVehicleOwner)],
            ["isSpaceProvider", JSON.stringify(isSpaceProvider)],
          ]);
        }

        let routeName = "Registration";
        if (userData.registerType?.vehicleowner) {
          routeName = "HomeVo";
        } else if (userData.registerType?.spaceprovider) {
          routeName = "HomeSp";
        }
        navigation.navigate(routeName);
      }
    } catch (error) {
      setIsLoading(false);
      setEmailError(true);
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
