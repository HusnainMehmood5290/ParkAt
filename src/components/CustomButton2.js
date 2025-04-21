import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton2 = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.Container}>
        <Text style={styles.Text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#3D5A0C",
    justifyContent: "center",
    padding: 16,
  },
  Text: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    // fontFamily: "Inter, sans-serif",
  },
});

export default CustomButton2;
