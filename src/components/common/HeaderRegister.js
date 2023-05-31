import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const HeaderRegister = ({ onPress, title, subtitle }) => {
  return (
    <View className="space-y-4">
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="arrowleft" size={30} />
      </TouchableOpacity>
      <View>
        <Text className="text-2xl font-InterBold">{title}</Text>
        <Text className="tracking-wide font-InterRegular">{subtitle}</Text>
      </View>
    </View>
  );
};

export default HeaderRegister;
