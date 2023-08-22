import { Text, Pressable, View } from "react-native";
import React from "react";

import { Avatar, Name } from "../common";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

const SearchUserCard = ({ onPress, imgUrl, name, username }) => {
  return (
    <StyledPressable
      onPress={onPress}
      className="flex-row items-center space-x-4 active:bg-gray-600/50"
    >
      <Avatar imgUrl={imgUrl} size={42} />
      <View className="flex-1 border-b border-grayCustom/40 py-3">
        <Name text={username} />
        <Text className="font-InterMedium text-grayCustom">{name}</Text>
      </View>
    </StyledPressable>
  );
};

export default SearchUserCard;
