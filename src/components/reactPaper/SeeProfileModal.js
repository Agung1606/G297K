import { View } from "react-native";
import React from "react";
import { Modal } from "react-native-paper";

import { Avatar } from "../common";

const SeeProfileModal = ({ isModalOpen, closeModal, profileUrl }) => (
  <Modal visible={isModalOpen} onDismiss={closeModal}>
    <View className="justify-center items-center">
      <Avatar imgUrl={profileUrl} size={250} />
    </View>
  </Modal>
);

export default SeeProfileModal;
