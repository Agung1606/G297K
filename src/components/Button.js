import { Text, ActivityIndicator } from "react-native";
import React from "react";
import { StyledPressable } from "./styledComponent";

import { styles } from "../style/Global";

export const ButtonBlue = ({ title, onPress, loading }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full h-[42px] justify-center items-center rounded-full bg-blue shadow-md shadow-black ${styles.pressableEffect}`}
  >
    {loading ? (
      <ActivityIndicator size={"large"} color={"#FFF"} />
    ) : (
      <Text className="text-lg font-InterSemiBold text-white">{title}</Text>
    )}
  </StyledPressable>
);

export const ButtonTransparent = ({ title, onPress, borderColor }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full h-[45px] justify-center items-center border-[1.5px] ${borderColor} rounded-2xl ${styles.pressableEffect}`}
  >
    <Text className={`text-[16px] font-InterSemiBold`}>
      {title}
    </Text>
  </StyledPressable>
);
