import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CardView from "../components/CardViewNearByPark";
import { useNavigation } from "@react-navigation/native";
import PopUpVehicleRequest from "../components/PopUpVehicleRequest";
import { supabase } from "../configs/supabaseConfig";
import * as Location from "expo-location";
import { getDistance } from "geolib";

export default function ParkingSpots() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [spacesData, setSpacesData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    const fetchSpacesData = async () => {
      const { data: spaces, error } = await supabase
        .from('spaces')
        .select('*');

      if (error) {
        return;
      }

      const spacesList = spaces.map((space) => {
        return {
          ...space,
          distance: userLocation && space.location
            ? getDistance(
                {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                },
                {
                  latitude: space.location.coords.latitude,
                  longitude: space.location.coords.longitude,
                }
              ) / 1000
            : 0,
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
            onPress={() => onPressHandler(space.ownerId)}
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
