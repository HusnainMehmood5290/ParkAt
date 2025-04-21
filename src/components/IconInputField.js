import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";

const IconInputField = ({ icon, placeholder, backgroundColor, ...rest }) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Image source={icon} style={styles.icon} resizeMode="stretch" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 20,
    // width: "70%",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#000",
  },
});

export default IconInputField;
