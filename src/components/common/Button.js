import React from "react";
import {
  Text,
  ActivityIndicator,
  Pressable,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../style/Global";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

export const ButtonRound = ({ onPress }) => (
  <StyledPressable
    onPress={onPress}
    className={`${styles.pressableEffect} bg-blue rounded-full p-2`}
  >
    <AntDesign name="arrowup" size={24} color="white" />
  </StyledPressable>
);

export const ButtonFollow = ({ loading, title, onPress, isFollow }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full py-1.5 justify-center items-center ${
      isFollow ? "border border-grayCustom/50" : "bg-blue"
    } rounded-lg ${styles.pressableEffect}`}
  >
    {loading ? (
      <ActivityIndicator size={"small"} color={"#FFF"} />
    ) : (
      <Text
        className={`font-InterMedium text-[15px] ${
          !isFollow && "text-white"
        }`}
      >
        {title}
      </Text>
    )}
  </StyledPressable>
);

export const ButtonRect = ({ title, onPress }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full py-1.5 justify-center items-center border border-grayCustom/50 rounded-lg ${styles.pressableEffect}`}
  >
    <Text className="font-InterMedium text-[15px]">{title}</Text>
  </StyledPressable>
);

export const ButtonBlue = ({ title, onPress, loading, disabled }) => (
  <StyledPressable
    disabled={disabled}
    onPress={onPress}
    className={`w-full py-[6px] justify-center items-center rounded-full ${
      disabled ? "bg-blue/50" : "bg-blue"
    } ${Platform.OS === "android" && "shadow-md shadow-black"} ${
      styles.pressableEffect
    }`}
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
    className={`w-full py-[10px] justify-center items-center border-[1.5px] ${borderColor} rounded-2xl ${styles.pressableEffect}`}
  >
    <Text className={`text-[16px] font-InterSemiBold`}>{title}</Text>
  </StyledPressable>
);
