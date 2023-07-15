import { Text, Pressable } from "react-native";
import React from "react";

import { Avatar } from "../common";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

const InfoCard = ({ onPress, imgUrl, username }) => {
  return (
    <StyledPressable
      onPress={onPress}
      className="flex-row items-center space-x-2 active:bg-gray-300/50 px-2 py-1 mb-2"
    >
      <Avatar imgUrl={imgUrl} size={45} />
      <Text className="font-InterSemiBold">{username}</Text>
    </StyledPressable>
  );
};

export default InfoCard;
