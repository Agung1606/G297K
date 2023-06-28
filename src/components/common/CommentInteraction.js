import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const CommentInteraction = ({ numberOfLikes }) => {
  const [likesCount, setLikesCount] = useState(numberOfLikes);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const options = [
    {
      name: "like",
      num: likesCount,
      icon: isLiked ? (
        <FontAwesome name="heart" size={18} color="red" />
      ) : (
        <FontAwesome name="heart-o" size={18} color="#7d7d7d" />
      ),
      onPress: handleLike,
    },
    {
      name: "comment",
      icon: <FontAwesome name="comment-o" size={18} color={"#7d7d7d"} />,
      onPress: () => {},
    },
  ];

  return (
    <View className="m-1 flex-row items-center space-x-4">
      {options.map((item) => (
        <View key={item.name} className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={item.onPress}>{item.icon}</TouchableOpacity>
          {item.num && (
            <Text className="font-InterRegular text-grayCustom">
              {item.num}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default CommentInteraction;
