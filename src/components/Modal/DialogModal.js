import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Dialog } from 'react-native-simple-dialogs'

const DialogModal = ({ isModalOpen, msg, closeModal }) => {
  return (
    <Dialog
      visible={isModalOpen}
      animationType="fade"
      onTouchOutside={closeModal}
    >
      <View className="space-y-6">
        <Text className="font-InterRegular text-lg text-center">{msg}</Text>
        <TouchableOpacity onPress={closeModal}>
          <Text className="font-InterMedium text-right">OK</Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

export default DialogModal;
