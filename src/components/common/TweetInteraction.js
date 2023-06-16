import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

import { styles } from "../../style/Global";

const TweetInteraction = ({
  numberOfLikes,
  numberOfComments,
  openModalSendComment,
}) => {
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
      text: numberOfComments,
      onPress: openModalSendComment,
    },
    {
      name: "likes",
      icon: isLiked ? (
        <FontAwesome name="heart" size={22} color="red" />
      ) : (
        <FontAwesome name="heart-o" size={22} color="#7d7d7d" />
      ),
      text: likesCount,
      onPress: handleLike,
    },
    {
      name: "share",
      icon: <Feather name="share-2" size={22} color="#7d7d7d" />,
      text: "",
      onPress: () => alert("Share this tweet"),
    },
  ];

  return (
    <View className={`flex-row ${styles.flexBetween}`}>
      {options.map((item) => (
        <TouchableOpacity
          key={item.name}
          className="flex-1 py-1"
          onPress={item.onPress}
        >
          <View className="flex-row items-center space-x-1">
            {item.icon}
            <Text className="text-grayCustom">{item.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TweetInteraction;