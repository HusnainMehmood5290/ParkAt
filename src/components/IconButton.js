import React from "react";
import { Text, StyleSheet, Pressable, Image } from "react-native";

const IconButton = ({
  text,
  icon,
  iconDirection,
  onPress,
  border = true,
  buttonStyle,
  textStyle,
  iconStyle,
}) => {
  const iconAlignment =
    iconDirection === "left" ? styles.iconLeft : styles.iconRight;

  return (
    <Pressable
      style={[
        styles.button,
        border && styles.border,
        iconDirection === "left" ? styles.buttonLeft : styles.buttonRight,
        buttonStyle,
      ]}
      onPress={onPress}
    >
      {icon && iconDirection === "left" && (
        <Image
          style={[styles.icon, iconAlignment, iconStyle]}
          source={icon}
          resizeMode="stretch"
        />
      )}
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      {icon && iconDirection === "right" && (
        <Image
          style={[styles.icon, iconAlignment, iconStyle]}
          source={icon}
          resizeMode="stretch"
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 7,
    marginBottom: 20,
    width: "100%",
    // Default background color
    // backgroundColor: "#FFFFFF",
  },
  buttonText: {
    // fontFamily: "Inter-Regular",
    marginLeft: 10,
    marginRight: 20,
    color: "#000000",
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  iconLeft: {
    marginLeft: 0,
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
    marginRight: 0,
  },
  buttonLeft: {
    justifyContent: "flex-start",
  },
  buttonRight: {
    justifyContent: "flex-end",
  },
  border: {
    borderWidth: 1,
    borderColor: "#000000",
  },
});

export default IconButton;
