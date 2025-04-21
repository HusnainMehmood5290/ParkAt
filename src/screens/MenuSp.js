import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import IconButton from "../components/IconButton";
import dashboardIcon from "../../assets/dashboard.png";
import myProfileIcon from "../../assets/My-Profile.png";
import contactIcon from "../../assets/contact.png";
import settigIcon from "../../assets/setting.png";
import CustomButton from "../components/CustomButton2";
import PopUp from "../components/PopUp";
import PopUpHandler from "../functions/PopUpHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MenuVo = () => {
  const { isVisible, showPopUp, hidePopUp, navigateTo } = PopUpHandler(false);
  const [email, setEmail] = useState(""); // Step 2: State hook for email
  const [isVehicleOwner, setIsVehicleOwner] = useState(""); // Step 2: State hook for email
  const [ownerId, setOwnerId] = useState();

  useEffect(() => {
    // Step 3: Retrieve email from AsyncStorage
    const getEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      const vehicleOwner = await AsyncStorage.getItem("isVehicleOwner");
      const owner = await AsyncStorage.getItem("_id");
      setOwnerId(owner);
      // const spaceProvider = await AsyncStorage.getItem("isSpaceProvider");
      if (vehicleOwner) {
        setIsVehicleOwner(vehicleOwner);
      }
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };

    getEmail();
  }, []);

  const vehicleOwnerMode = () => {
    if (isVehicleOwner === "true") {
      navigateTo("HomeVo");
    } else {
      showPopUp();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/user-pic.png")}
        />
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.myBooking}>Space Provider Menu</Text>
      </View>

      {/* Buttons */}
      <View style={{ paddingLeft: 15, width: "100%" }}>
        <IconButton
          text={"My Profile"}
          icon={myProfileIcon}
          iconDirection={"left"}
          border={false}
        />
        <IconButton
          border={false}
          text={"Dashbard"}
          icon={dashboardIcon}
          iconDirection={"left"}
        />
        <IconButton
          text={"Contact Us"}
          border={false}
          icon={contactIcon}
          iconDirection={"left"}
        />

        <IconButton
          border={false}
          text={"Setting"}
          icon={settigIcon}
          iconDirection={"left"}
          buttonStyle={{ marginBottom: 70, borderBottomWidth: 1 }}
        />
      </View>
      <View style={styles.buttomButton}>
        <CustomButton text={"Vehicle Owner Mode"} onPress={vehicleOwnerMode} />
        <PopUp
          title={"You Haven't Registered Any Vehicle Yet..!"}
          description={
            "If you want to register your vehicle provide further detail and press Yes otherwise press No."
          }
          isVisible={isVisible}
          onYesPress={() => {
            navigateTo("Register Vehicle", { _id: ownerId });
          }}
          onNoPress={hidePopUp}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  profileContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  email: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
    color: "#333333",
  },
  myBooking: {
    textDecorationLine: "underline",
    marginTop: 20,
    marginBottom: 25,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  buttomButton: {},
});

export default MenuVo;
