import { Image, Pressable } from "react-native";
import React from "react";

import { styled } from "nativewind";
const SyledPressable = styled(Pressable);

const Avatar = ({ imgUrl, local, size, onPress }) => (
  <SyledPressable onPress={onPress} className="active:scale-95">
    <Image
      source={local ? imgUrl : { uri: imgUrl }}
      alt="img"
      style={{
        width: size,
        height: size,
        borderRadius: 200,
      }}
    />
  </SyledPressable>
);

export default Avatar;
