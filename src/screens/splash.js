import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loadFonts } from "../../GlobalStyles";

const { width } = Dimensions.get("window");
const imageWidth = width * 0.6;
const imageHeight = imageWidth * 1.04;

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // loadFonts();
    setTimeout(() => {
      navigation.navigate("Main");
    }, 1000);
  }, []);
  return (
    <View style={styles.introContainer}>
      <Image
        resizeMode="cover"
        source={require("../../assets/logo.png")}
        style={styles.logoImage}
      />
      <View style={styles.textContainer}>
        <AppNameText />
        <SloganText />
      </View>
    </View>
  );
};

const AppNameText = () => <Text style={styles.appNameText}>ParkAt</Text>;

const SloganText = () => (
  <Text style={styles.sloganText}>Effortless Parking Anywhere, Anytime</Text>
);

const styles = StyleSheet.create({
  introContainer: {
    borderRadius: 20,
    backgroundColor: "#EB89ED",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
    // margin: 20,
  },
  logoImage: {
    borderRadius: imageWidth / 2,
    width: imageWidth,
    height: imageHeight,
    marginBottom: 20,
  },
  textContainer: {
    backgroundColor: "rgba(235, 137, 237, 0.62)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 36,
    width: "100%",
    borderRadius: 10,
  },
  appNameText: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
  },
  sloganText: {
    color: "#FEFEFE",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Splash;
