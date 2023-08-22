import React from "react"
import { View, Text, Image } from "react-native"

import { assets } from "../../constant";

const Name = ({ text, size="small" }) => {

  const textSize = {
    "small": "text-sm",
    "large": "text-xl"
  }

  const imgSize = {
    "small": "w-3 h-3",
    "large": "w-4 h-4"
  }

  return (
    <View className="flex-row items-center space-x-1">
      <Text className={`font-InterBold ${textSize[size]}`}>{text}</Text>
      <Image source={assets.verified} className={imgSize[size]} />
    </View>
  )
};

export default Name;