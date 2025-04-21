import React, { useState } from "react";
import { View, ImageBackground, Text, StyleSheet } from "react-native";
import CardViewParking from "../components/CardViewParking";
import FareCalculator from "../components/FareCalculator";
const TodayParking = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../../assets/parking.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Today’s Parking</Text>
      </View>

      <CardViewParking
        name={"Ahmed khan"}
        vehicleName={"Suzuki Wagon R"}
        registrationNumber={"AAA-0011"}
        profilePic={require("../../assets/user-pic.png")}
        onPress={() => setModalVisible(true)}
      />
      <FareCalculator
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Modal Title"
        RegNumber={"AAA-0011"}
        buttonText="Close"
        onPressButton={() => setModalVisible(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  headerContainer: {
    marginVertical: 20,
    paddingVertical: 5,
    alignSelf: "center",
    backgroundColor: "#fff9",
    width: "90%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 35,
    fontWeight: "700",
    color: "#BF2D2D",
    // textShadow: "1px 1px rgba(0, 0, 0, 0.25)",
  },

  parkingInfoContainer: {
    alignSelf: "center",
    backgroundColor: "#3F3C3C",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  driverContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  driverName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
  },

  vehicle: {
    color: "#FFFFFF",
    flex: 1,
  },

  regNumber: {
    color: "#FFFFFF",
    flex: 1,
  },
});

export default TodayParking;
