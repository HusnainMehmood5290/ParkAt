import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import FloatingActionButton from "../components/FloatingActionButon";
import { useNavigation } from "@react-navigation/native";
import PopUpParkingRequest from "../components/PopUpParkingRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeSp = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState("Ahmed Khan");
  const [vehicle, setVehicle] = useState("Suzuki Wagon R");
  const [registrationNumber, setRegistrationNumber] = useState("AAA-0011");

  const [ownerId, setOwnerId] = useState();

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleAcceptModal = () => {
    setModalVisible(false);
    navigation.navigate("Today Parkings");
  };
  useEffect(() => {
    const getId = async () => {
      const owner = await AsyncStorage.getItem("_id");
      setOwnerId(owner);
    };

    getId();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // navigation.navigate("Main");
  //     handleShowModal();
  //   }, 1000);
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <Image
          source={require("../../assets/parking-rectangle.png")}
          resizeMode="stretch"
          style={styles.mapImage}
        />
      </View>
      <TouchableOpacity
        onPress={navigation.openDrawer}
        style={{ position: "absolute" }}
      >
        <Image
          source={require("../../assets/menu2.png")}
          resizeMode="contain"
          style={styles.menu}
        />
      </TouchableOpacity>
      <View style={styles.bottomView}>
        <View
          style={[styles.box, { backgroundColor: "rgba(241, 230, 230, 1)" }]}
        >
          <Text style={styles.boxText}>Book space</Text>
          <Text style={styles.boxText}>5</Text>
        </View>
        <View
          style={[styles.box, { backgroundColor: "#rgba(240, 106, 106, 1)" }]}
        >
          <Text style={styles.boxText}>Earnings</Text>
          <Text style={styles.boxText}>12345 PKR</Text>
        </View>
        <View
          style={[styles.box, { backgroundColor: "rgba(241, 230, 230, 1)" }]}
        >
          <Text style={styles.boxText}>Pending Request</Text>
          <Text style={styles.boxText}>3</Text>
        </View>
        <View
          style={[styles.box, { backgroundColor: "#rgba(240, 106, 106, 1)" }]}
        >
          <Text style={styles.boxText}>Today's Parking</Text>
          <Text style={styles.boxText}>0</Text>
        </View>
      </View>
      <FloatingActionButton
        label={"+"}
        onPress={() => navigation.navigate("Register Space", ownerId)}
      />
      <PopUpParkingRequest
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onAccept={handleAcceptModal}
        userName={userName}
        vehicle={vehicle}
        registrationNumber={registrationNumber}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  menu: {
    position: "absolute",
    top: 45,
    left: 25,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: 45,
    height: 50,
    zIndex: 1,
  },
  mapView: {
    flex: 0.4,
  },
  bottomView: {
    flex: 0.6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    width: "48%", // Adjust as needed
    height: "40%", // Set the height as needed
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    margin: 2,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "600",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default HomeSp;
