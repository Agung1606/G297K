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
      name: "comment",
      icon: <FontAwesome name="comment-o" size={22} color={"#7d7d7d"} />,
      onPress: () => {},
    },
    {
      name: "like",
      num: likesCount,
      icon: isLiked ? (
        <FontAwesome name="heart" size={22} color="red" />
      ) : (
        <FontAwesome name="heart-o" size={22} color="#7d7d7d" />
      ),
      onPress: handleLike,
    },
  ];

  return (
    <View className="m-1 flex-row items-center space-x-4">
      {options.map((item) => (
        <TouchableOpacity
          key={item.name}
          onPress={item.onPress}
          className="w-14 flex-row items-center space-x-1"
        >
          {item.icon}
          {item.num && (
            <Text className="font-InterRegular text-grayCustom">
              {item.num}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CommentInteraction;
