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

  return (
    <View className={`flex-row ${styles.flexBetween}`}>
      {/* comment */}
      <View className={`${styles.iconInteractionWrapper}`}>
        <TouchableOpacity onPress={openModalSendComment}>
          <FontAwesome name="comment-o" size={22} color="#7d7d7d" />
        </TouchableOpacity>
        <Text className="text-grayCustom">{numberOfComments}</Text>
      </View>
      {/* like */}
      <View className={`${styles.iconInteractionWrapper}`}>
        <TouchableOpacity onPress={handleLike}>
          {isLiked ? (
            <FontAwesome name="heart" size={22} color="red" />
          ) : (
            <FontAwesome name="heart-o" size={22} color="#7d7d7d" />
          )}
        </TouchableOpacity>
        <Text className="text-grayCustom">{likesCount}</Text>
      </View>
      {/* share */}
      <TouchableOpacity>
        <Feather name="share-2" size={22} color="#7d7d7d" />
      </TouchableOpacity>
    </View>
  );
};

export default TweetInteraction;
