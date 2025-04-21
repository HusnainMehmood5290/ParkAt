import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

const Spinner = ({ text, onPress, isLoading }) => {
  return (
    <TouchableOpacity
      style={[styles.optionButton, isLoading && styles.buttonDisabled]}
      onPress={isLoading ? null : onPress}
      disabled={isLoading}
    >
      <Text style={styles.optionButtonText}>{text}</Text>
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color="#41545C" style={styles.spinner} />
        </View>
      )}
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
    width: "100%",
    position: "relative", // Ensure the button is relative to position the spinner
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#41545C",
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  spinnerContainer: {
    ...StyleSheet.absoluteFillObject, // Ensures the spinner covers the entire button
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    // No margin needed
  },
});

export default Spinner;
