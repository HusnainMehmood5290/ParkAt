import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import IconButton from "../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import PopUpRating from "../components/PopUpRating";
import MapView from "react-native-maps";

const Direction = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate("HomeVoDrawer");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        {/* <Image
          source={require("../../assets/Direction.png")}
          resizeMode="cover"
          style={styles.mapImage}
        /> */}
        <MapView style={styles.mapImage} />
      </View>
      <TouchableOpacity
        onPress={navigation.openDrawer}
        style={{ position: "absolute" }}
      >
        <Image
          source={require("../../assets/menu.png")}
          resizeMode="contain"
          style={styles.menu}
        />
      </TouchableOpacity>
      <View style={styles.locationView}>
        <IconButton
          text={"Ram Ghr Bazar"}
          icon={require("../../assets/greenLocation.png")}
          iconDirection={"left"}
          buttonStyle={styles.loctionButton}
        />
        <IconButton
          buttonStyle={styles.loctionButton}
          text={"GT Road"}
          icon={require("../../assets/redLocation.png")}
          iconDirection={"left"}
        />
        <Button
          text={"End Journey"}
          buttonstyle={styles.endJourney}
          textStyle={{ color: "white" }}
          onPress={() => setModalVisible(true)}
        />
        <PopUpRating isVisible={modalVisible} onClose={handleCloseModal} />
      </View>
      <View style={styles.container3}>
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>
            <Text style={styles.contactTextBold}>Contact Owner</Text>
            <Text style={styles.contactTextLight}> (for further details) </Text>
            <Text style={styles.contactTextBold}>via</Text>
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              source={require("../../assets/call.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              source={require("../../assets/message.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              source={require("../../assets/whatsapp.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  menu: {
    position: "absolute",
    top: 45,
    left: 25,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: 45,
    height: 50,
    zIndex: 1, // Set a higher zIndex to ensure the menu appears above other elements
  },
  mapView: {
    flex: 0.6,
  },
  locationView: {
    textAlign: "center",
    justifyContent: "center",
    flex: 0.2,
    paddingHorizontal: 25,
    backgroundColor: "#rgba(73, 73, 73, 1)",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loctionButton: {
    backgroundColor: "#FFFFFF",
    elevation: 6,
    marginBottom: 10,
  },
  endJourney: {
    backgroundColor: "#000",
    width: "50%",
    alignSelf: "center",
    marginTop: 0,
    // elevation: 5,
    shadowColor: "#rgba(73, 73, 73, 1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  container3: {
    backgroundColor: "#000",
    flexDirection: "column",
    flex: 0.2,
  },
  contactInfo: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  contactText: {
    color: "#FFF",
    textAlign: "center",
    // fontFamily: "Inter, sans-serif",
  },
  contactTextBold: {
    fontWeight: "600",
  },
  contactTextLight: {
    fontWeight: "300",
    color: "rgba(255,255,255,0.6)",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    width: 35,
    height: 35,
  },
  closeButton: {
    position: "absolute",
    top: 45,
    right: 25,
    zIndex: 2,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
  },
});

export default Direction;
