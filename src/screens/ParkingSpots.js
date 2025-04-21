import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CardView from "../components/CardViewNearByPark";
import { useNavigation } from "@react-navigation/native";
import PopUpVehicleRequest from "../components/PopUpVehicleRequest";
import { fireStoreDb } from "../configs/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import * as Location from "expo-location";
import { getDistance, getPreciseDistance } from "geolib";

export default function ParkingSpots() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [spacesData, setSpacesData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    const fetchSpacesData = async () => {
      const spacesCollection = collection(fireStoreDb, "spaces");
      const spacesSnapshot = await getDocs(spacesCollection);
      const spacesList = spacesSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          distance: userLocation
            ? getDistance(
                {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                },
                {
                  latitude: data.location.coords.latitude,
                  longitude: data.location.coords.longitude,
                }
              ) / 1000
            : 0, // distance in km
        };
      });
      setSpacesData(spacesList);
    };

    if (userLocation) {
      fetchSpacesData();
    } else {
      fetchUserLocation();
    }
  }, [userLocation]);

  const calculateTime = (distance) => {
    const averageSpeed = 50; // assuming average speed is 50 km/h
    return (distance / averageSpeed).toFixed(2); // time in hours
  };

  const onPressHandler = (id) => {
    setModalVisible(true);
    console.log(id);
    setTimeout(() => navigation.navigate("Direction"), 2000);
  };

  const onCloseHandler = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Parking Spot Near You</Text>
      <ScrollView>
        {spacesData.map((space, index) => (
          <CardView
            key={index}
            address={space.name} // Assuming name is the address of the parking spot
            distance={`${space.distance} KM`}
            name={space.ownerName}
            time={`${calculateTime(space.distance)} hours`}
            rating={3}
            onPress={() => onPressHandler(space._ownerId)}
          />
        ))}
        <PopUpVehicleRequest
          isVisible={modalVisible}
          onClose={onCloseHandler}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 26,
  },
});
