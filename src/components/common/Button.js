import { Text, ActivityIndicator, Pressable } from "react-native";
import React from "react";

import { styles } from "../../style/Global";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable)

export const ButtonBlue = ({ title, onPress, loading }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full h-[42px] ${styles.flexCenter} rounded-full bg-blue shadow-md shadow-black ${styles.pressableEffect}`}
  >
    {loading ? (
      <ActivityIndicator size={"large"} color={"#FFF"} />
    ) : (
      <Text className="text-lg font-InterSemiBold text-white">{title}</Text>
    )}
  </StyledPressable>
);

export const ButtonGray = ({ title, onPress }) => (
  <StyledPressable onPress={onPress} className={`w-full h-[35px] ${styles.flexCenter} bg-gray-600/50 rounded-lg ${styles.pressableEffect}`}>
    <Text className="font-InterSemiBold text-[16px]">{title}</Text>
  </StyledPressable>
);

export const ButtonTransparent = ({ title, onPress, borderColor }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full h-[45px] ${styles.flexCenter} border-[1.5px] ${borderColor} rounded-2xl ${styles.pressableEffect}`}
  >
    <Text className={`text-[16px] font-InterSemiBold`}>
      {title}
    </Text>
  </StyledPressable>
);
