import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ text, onPress, buttonstyle, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.optionButton, buttonstyle]}
      onPress={onPress}
    >
      <Text style={[styles.optionButtonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    marginTop: 36,
    backgroundColor: "#AEDCF0",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "100%", // Set the width to 100%
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#41545C",
  },
});

export default CustomButton;
