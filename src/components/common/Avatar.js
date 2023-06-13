import { Image, TouchableOpacity } from "react-native";
import React from "react";


const Avatar = ({ imgUrl, size, onPress, onLongPress }) => (
  <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
    <Image
      source={imgUrl}
      alt="img"
      style={{
        width: size,
        height: size,
        borderRadius: 100
      }}
    />
  </TouchableOpacity>
);

export default Avatar;
