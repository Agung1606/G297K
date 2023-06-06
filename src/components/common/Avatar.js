import { Image, TouchableOpacity } from "react-native";
import React from "react";


const Avatar = ({ imgUrl, size, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={imgUrl}
      alt="img"
      style={{
        width: size,
        height: size,
        borderRadius: 50
      }}
    />
  </TouchableOpacity>
);

export default Avatar;
