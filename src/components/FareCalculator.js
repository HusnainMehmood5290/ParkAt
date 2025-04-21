import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import IconInputField from "./IconInputField";
const FareCalculator = ({ visible, onClose, RegNumber, onPressButton }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.title}>Fare Calculator</Text>
          <Text style={styles.message}>(Vehicle:{RegNumber})</Text>
          <IconInputField
            backgroundColor={"#fff"}
            icon={require("../../assets/startTime.png")}
            placeholder={"Start Time (00:00:00)"}
          />
          <IconInputField
            backgroundColor={"#fff"}
            icon={require("../../assets/endTime.png")}
            placeholder={"End Time (00:00:00)"}
          />
          <Button
            text={"Calculate"}
            onPress={onClose}
            buttonstyle={{ backgroundColor: "rgba(238, 34, 34, 1)" }}
            textStyle={{ color: "#000" }}
          />
          <Text style={styles.message}>Total Fare:550 PKR</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    width: "80%",
  },
  title: {
    color: "rgba(238, 34, 34, 1)",
    fontSize: 26,
    fontWeight: "bold",
  },
  message: {
    color: "rgba(238, 34, 34, 1)",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FareCalculator;
