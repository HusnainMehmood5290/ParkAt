import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Color, FontSize, FontFamily } from "../../GlobalStyles";
import IconButton from "../components/IconButton";
const Main = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.signInContainer}>
        <Text style={styles.signInOr}>
          Sign in or create new account to continue!
        </Text>
        <IconButton
          text="Register new ParkAt Account"
          icon={require("../../assets/register.png")}
          iconDirection="left"
          onPress={() => navigation.navigate("Registration")}
        />
        <IconButton
          text="Login with email or phone"
          icon={require("../../assets/login.png")}
          iconDirection="right"
          onPress={() => navigation.navigate("Login")}
        />
        <Text style={styles.byProceedingWithContainer}>
          By proceeding with creating an account you agree to the ParkAt{" "}
          <Text style={styles.termsAndConditions}>Terms and Conditions</Text>{" "}
          and <Text style={styles.termsAndConditions}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: Padding.p_6xs,
    alignItems: "center",
    justifyContent: "center",
  },
  signInContainer: {
    width: "70%",
    textAlign: "left",
  },
  signInOr: {
    fontSize: FontSize.size_5xl,
    fontWeight: "500",
    // fontFamily: FontFamily.interMedium,
    textAlign: "left",
    color: Color.colorBlack,
    marginBottom: 40,
  },
  byProceedingWithContainer: {
    fontSize: FontSize.size_xs,
    fontWeight: "200",
    // fontFamily: FontFamily.interExtraLight,
    color: Color.colorDarkGray,
    textAlign: "left",
    // width: "70%",
    marginTop: 80,
    marginBottom: 80,
  },
  termsAndConditions: {
    textDecorationLine: "underline",
  },
});

export default Main;
