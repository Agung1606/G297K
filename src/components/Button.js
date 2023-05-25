import { Text, Pressable } from "react-native";
import React from "react";

export const ButtonBlue = ({ title, width, onPress }) => (
  <Pressable
    onPress={onPress}
    className={`w-[${width}] h-[40px] justify-center items-center rounded-full bg-[#1D7ED8]`}
  >
    <Text className="text-lg font-semibold text-white">{title}</Text>
  </Pressable>
);
