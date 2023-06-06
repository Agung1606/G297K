import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Modal } from "react-native-paper";

const DialogModal = ({ isModalOpen, msg, closeModal }) => {
  return (
    <Modal
      visible={isModalOpen}
      onDismiss={closeModal}
      contentContainerStyle={{
        backgroundColor: "white",
        padding: 10,
        marginHorizontal: 10,
      }}
    >
      <View className="space-y-6">
        <Text className="font-InterRegular text-lg text-center">{msg}</Text>
        <TouchableOpacity onPress={closeModal}>
          <Text className="font-InterMedium text-right px-10">OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DialogModal;
