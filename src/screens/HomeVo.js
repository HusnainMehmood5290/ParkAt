import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import IconButton from "../components/IconButton";
import FloatingActionButton from "../components/FloatingActionButon";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeVo = () => {
  const navigation = useNavigation();
  const [locationFetched, setLocationFetched] = useState(false);
  const [ownerId, setOwnerId] = useState();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 31.447082,
    longitude: 74.268168,
    latitudeDelta: 0.005, // Higher zoom level
    longitudeDelta: 0.005, // Higher zoom level
  });

  useEffect(() => {
    const getId = async () => {
      const owner = await AsyncStorage.getItem("_id");
      setOwnerId(owner);
    };

    getId();
  }, []);

  const [currentLocation, setCurrentLocation] = useState(null);

  const findLocation = async () => {
    // Request permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    // Get the current location with highest accuracy
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    console.log(location);
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.009, // Higher zoom level
      longitudeDelta: 0.009, // Higher zoom level
    });
    setLocationFetched(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          style={styles.mapImage}
          initialRegion={initialRegion} // Default location without marker
          region={currentLocation || initialRegion} // Update region only when location is fetched
        >
          {locationFetched && currentLocation && (
            <Marker coordinate={currentLocation} title="Your Location" />
          )}
        </MapView>
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
      <View style={styles.buttomView}>
        <IconButton
          text={"Your Location"}
          icon={require("../../assets/mapIcon.png")}
          iconDirection={"left"}
          onPress={findLocation}
          buttonStyle={styles.loctionButton}
        />
        <IconButton
          buttonStyle={styles.buttonStyle}
          text={"Find Parking Spot NearBy"}
          icon={require("../../assets/searchLocation.png")}
          iconDirection={"left"}
          onPress={() => navigation.navigate("Parking Spots")}
        />
      </View>
      <FloatingActionButton
        label={"+"}
        onPress={() => navigation.navigate("Register Vehicle", ownerId)}
      />
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
    zIndex: 1,
  },
  mapView: {
    flex: 0.65,
  },
  buttomView: {
    textAlign: "center",
    justifyContent: "center",
    flex: 0.35,
    paddingHorizontal: 25,
  },
  buttonStyle: {
    backgroundColor: "rgba(184, 229, 111, 1)",
    elevation: 6,
  },
  loctionButton: {
    elevation: 6,
    backgroundColor: "#FFFFFF",
    marginBottom: 40,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default HomeVo;
