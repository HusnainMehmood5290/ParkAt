import React, { useState } from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Button from "./Button";

const PopUpRating = ({ isVisible, onClose }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarPress = (selectedRating) => {
    setSelectedStars(selectedRating);
  };

  const handleSubmit = () => {
    onClose();
  };

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
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
              >
                <FontAwesome
                  name={star <= selectedStars ? "star" : "star-o"}
                  size={30}
                  color={star <= selectedStars ? "#FFD700" : "gray"}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Button
            onPress={handleSubmit}
            buttonstyle={styles.submitButton}
            text={"Submit"}
            textStyle={styles.submitButtonText}
          />
        </View>
      </View>
    </Modal>
  );
};

const HeaderText = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>How was Your Experience</Text>
  </View>
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
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    // fontFamily: "Arimo, sans-serif",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "rgba(244, 206, 69, 1)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "rgba(255, 0, 0, 1)",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PopUpRating;
