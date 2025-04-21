import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const PopUpVehicleRequest = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <HeaderText />
          <SubHeaderText />
          <ParkingRequestImage />
          <CloseButton onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const HeaderText = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Parking Request</Text>
  </View>
);

const SubHeaderText = () => (
  <View style={styles.subHeaderContainer}>
    <Text style={styles.subHeaderText}>
      Waiting for Space Provider to accept your request
    </Text>
  </View>
);

const ParkingRequestImage = () => (
  <Image
    resizeMode="cover"
    source={require("../../assets/waiting.png")}
    style={styles.parkingImage}
  />
);

const CloseButton = ({ onPress }) => (
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <Text style={styles.closeButtonText}>Close</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    marginVertical: 8,
  },
  headerText: {
    color: "#4F8CE8",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    // fontFamily: "Arimo, sans-serif",
  },
  subHeaderContainer: {
    marginTop: 12,
  },
  subHeaderText: {
    color: "#EE4242",
    fontSize: 12,
    fontStyle: "italic",
    // fontFamily: "Arimo, sans-serif",
    textAlign: "center",
  },
  parkingImage: {
    marginTop: 15,
    width: 50,
    height: 50,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#4F8CE8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PopUpVehicleRequest;
