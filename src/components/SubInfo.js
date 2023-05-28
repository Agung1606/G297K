import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { styles } from "../style/Global";
import { bottomModalConfig } from "../hooks";

const Interaction = ({ numberOfLikes, numberOfComments, username }) => {
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

  const { bottomSheetModalRef, snapPoints, openModal, closeModal } =
    bottomModalConfig(["100%"]);

  return (
    <>
      <View className={`flex-row ${styles.flexBetween}`}>
        {/* like */}
        <View className={`${styles.iconInteractionWrapper}`}>
          <TouchableOpacity onPress={handleLike}>
            {isLiked ? (
              <FontAwesome name="heart" size={22} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={22} color="#7d7d7d" />
            )}
          </TouchableOpacity>
          <Text className="text-[#7d7d7d]">{likesCount}</Text>
        </View>
        {/* comment */}
        <View className={`${styles.iconInteractionWrapper}`}>
          <TouchableOpacity onPress={openModal}>
            <FontAwesome name="comment-o" size={22} color="#7d7d7d" />
          </TouchableOpacity>
          <Text className="text-[#7d7d7d]">{numberOfComments}</Text>
        </View>
        {/* share */}
        <TouchableOpacity>
          <Feather name="share-2" size={22} color="#7d7d7d" />
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <Text>{username}</Text>
      </BottomSheetModal>
    </>
  );
};

export { Interaction };
