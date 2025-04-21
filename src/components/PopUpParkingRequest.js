import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

const PopUpParkingRequest = ({
  isVisible,
  onClose,
  onAccept,
  userName,
  vehicle,
  registrationNumber,
}) => {
  const closeModal = () => {
    onClose && onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>Parking Request</Text>
          <View style={styles.row}>
            <Image
              resizeMode="cover"
              source={require("../../assets/user-pic.png")}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vehicle:</Text>
            <Text style={styles.content}>{vehicle}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Registration Number:</Text>
            <Text style={styles.content}>{registrationNumber}</Text>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
              <Text style={styles.actionText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={closeModal}>
              <Text style={styles.actionText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    width: "98%",
  },
  headerText: {
    marginBottom: 15,
    color: "#4F8CE8",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // textAlign: "left",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  profileImage: {
    borderRadius: 50,
    width: 60,
    height: 60,
    marginRight: 13,
  },
  userName: {
    fontStyle: "italic",
  },
  label: {
    fontWeight: "bold",
  },
  content: {
    fontStyle: "italic",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  acceptButton: {
    borderRadius: 10,
    backgroundColor: "#2E832C",
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: "48%",
    alignItems: "center",
  },
  rejectButton: {
    borderRadius: 10,
    backgroundColor: "#EE4242",
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "48%",
    alignItems: "center",
  },
  actionText: {
    color: "#FFF",
    fontWeight: "700",
  },
});

export default PopUpParkingRequest;
