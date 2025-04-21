import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const FloatingActionButton = ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#rgba(61, 90, 12, 1)",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  label: {
    fontSize: 40,
    color: "#FFFFFF",
  },
});

export default FloatingActionButton;
