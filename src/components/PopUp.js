import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PopUp = ({
  isVisible,
  onYesPress,
  onNoPress,
  title,
  description,
  navigateTo,
}) => {
  const navigation = useNavigation();

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onYesPress}
              style={[styles.button, { backgroundColor: "#2E832C" }]}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onNoPress}
              style={[styles.button, { backgroundColor: "#EE4242" }]}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
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
  modalContent: {
    borderRadius: 20,
    backgroundColor: "#CAC7C7",
    padding: 32,
    maxWidth: 330,
  },
  titleText: {
    color: "rgba(181,0,0,1)",
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  subtitleText: {
    textTransform: "capitalize",
    color: "rgba(106,84,242,1)",
    marginBottom: 32,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default PopUp;
