import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CardView = ({ name, rating, address, distance, time, fare, onPress }) => {
  // Convert rating to stars
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesome key={i} name="star" size={20} color="yellow" />);
  }
  if (halfStar) {
    stars.push(
      <FontAwesome
        key={"half"}
        name="star-half-full"
        size={20}
        color="yellow"
      />
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesome key={`empty-${i}`} name="star-o" size={20} color="yellow" />
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.rating}>{stars}</View>
      </View>
      <View style={styles.row}>
        <Text style={styles.address}>Address: {address}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.distance}>Distance Away: {distance}</Text>
        <Text style={styles.time}>Estimated Time: {time}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fare}>Fare/Hour: {fare} PKR</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 210, 210, 1)",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
  },
  address: {
    flex: 1,
  },
  distance: {
    flex: 1,
  },
  time: {
    flex: 1,
  },
  fare: {
    flex: 1,
  },
});

export default CardView;
