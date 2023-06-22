import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const HeaderRegister = ({ showBtn, onPress, title, subtitle }) => {
  return (
    <>
      {showBtn && (
        <TouchableOpacity onPress={onPress}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
      )}
      <View className="mt-4">
        <Text className="text-2xl font-InterBold">{title}</Text>
        <Text className="tracking-wide font-InterRegular">{subtitle}</Text>
      </View>
    </>
  );
};

export default HeaderRegister;
