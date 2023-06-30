import { View, Text, Pressable } from "react-native";
import React from "react";
import { Modal } from "react-native-paper";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

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
        backgroundColor: "#d8d8d8",
        marginHorizontal: 50,
        borderRadius: 20,
      }}
    >
      <View className="space-y-2 p-4">
        <Text className="text-center font-InterBold text-lg">{title}</Text>
        <Text className="text-center font-InterRegular">{subtitle}</Text>
      </View>
      <View className="mt-2">
        <StyledPressable
          onPress={onOk}
          className="border-t border-gray-600/60 active:bg-gray-600/30"
        >
          <Text className="font-InterMedium text-lg text-red-600 text-center py-2">
            {textBtnOk}
          </Text>
        </StyledPressable>
        <StyledPressable
          onPress={onCancel}
          className="border-t border-gray-600/60 active:bg-gray-600/30"
        >
          <Text className="font-InterMedium text-lg text-center py-2">
            {textBtnCancel}
          </Text>
        </StyledPressable>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
