import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Modal } from "react-native-paper";

const ConfirmModal = ({
  isModalOpen,
  onCancel,
  onOk,
  title,
  subtitle,
  textBtnCancel,
  textBtnOk,
}) => {
  return (
    <Modal
      visible={isModalOpen}
      onDismiss={onCancel}
      contentContainerStyle={{
        backgroundColor: "white",
        padding: 10,
        marginHorizontal: 30,
        borderRadius: 8,
      }}
    >
      <View className="space-y-2 mb-6">
        <Text className="text-center font-InterBold text-lg">{title}</Text>
        <Text className="text-center font-InterRegular">{subtitle}</Text>
      </View>
      <View className="flex-row justify-end space-x-10">
        <TouchableOpacity onPress={onCancel}>
          <Text className="font-InterSemiBold">{textBtnCancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onOk}>
          <Text className="font-InterSemiBold">{textBtnOk}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
