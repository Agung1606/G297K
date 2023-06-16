import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

const CommentInteraction = () => {
  const options = [
    {
      name: "like",
      num: 297,
      icon: <SimpleLineIcons name="like" size={18} />,
      onPress: () => {},
    },
    {
      name: "dislike",
      num: 0,
      icon: <SimpleLineIcons name="dislike" size={18} />,
      onPress: () => {},
    },
  ];
  return (
    <View className="m-2 flex-row items-center space-x-10">
      {options.map((item) => (
        <View key={item.name} className="flex-row items-center space-x-2">
          <TouchableOpacity>{item.icon}</TouchableOpacity>
          {item.num && <Text className="font-InterRegular">{item.num}</Text>}
        </View>
      ))}
    </View>
  );
};

export default CommentInteraction;
