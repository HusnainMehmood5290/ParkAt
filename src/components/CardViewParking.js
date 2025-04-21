import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CardViewParking = ({
  profilePic,
  name,
  vehicleName,
  registrationNumber,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profilePic} style={styles.profilePic} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Vehicle:</Text>
        <Text style={styles.value}>{vehicleName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Registration Number:</Text>
        <Text style={styles.value}>{registrationNumber}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Calculate Fare</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F3C3C",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  value: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginRight: 5,
  },
  button: {
    backgroundColor: "#2E832C",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CardViewParking;
