import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Avatar from "../common/Avatar";
import { bottomModalConfig } from "../../hooks";
import { assets } from "../../constant";
import { ButtonBlue } from "../common/Button";
import { styles } from "../../style/Global";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable)

const TweetCard = ({ item }) => {
  const navigation = useNavigation();
  const goToDetails = () => navigation.navigate("DetailsTweetScreen", { param: item })

  const [text, setText] = useState(item.tweet.slice(0, 550));
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    if (!readMore) {
      setText(item.tweet);
      setReadMore(true);
    } else {
      setText(item.tweet.slice(0, 550));
      setReadMore(false);
    }
  };

  return (
    <View className="px-3 py-2 mb-2 border-b border-gray-300">
      {/* container */}
      <View className="flex-row space-x-2">
        {/* profile */}
        <Avatar imgUrl={item.profile} size={50} onPress={() => alert("Visit the profile")} />
        {/* wrapper */}
        <View className="flex-1">
          <StyledPressable onPress={goToDetails} className="active:bg-gray-600/20 rounded-lg">
            {/* username and date */}
            <View className={`flex-row ${styles.flexBetween} mb-1`}>
              <View>
                <Text className="font-InterBold">{item.username}</Text>
                <Text className="text-[12px] text-gray-400">{item.date}</Text>
              </View>
              <TouchableOpacity onPress={() => alert("Open more vertical modal")}>
                <MaterialIcons name="more-vert" size={25} />
              </TouchableOpacity>
            </View>
            {/* tweets */}
            <Text className={`font-InterRegular mb-3`}>
              {text}
              {item.tweet.length > 550 && (
                <Text
                  onPress={handleReadMore}
                  className="text-blue font-InterSemiBold"
                >
                  {readMore ? " Show Less" : "...Read More"}
                </Text>
              )}
            </Text>
          </StyledPressable>
          {/* like, comment, and share */}
          <Interaction
            id={item.id}
            username={item.username}
            numberOfLikes={item.numberOfLikes}
            numberOfComments={item.numberOfComments}
          />
        </View>
      </View>
    </View>
  );
};

export const Interaction = ({ id, username, numberOfLikes, numberOfComments }) => {
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
      {/* bottom modal comment */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <Comment username={username} closeModal={closeModal} />
      </BottomSheetModal>
    </>
  );
};

const Comment = ({ username, closeModal }) => {
  const [commentInput, setCommentInput] = useState("");
  const handleComment = () => {
    if (!commentInput) {
      alert("Give me some word");
    } else {
      alert("Send to database");
    }
  };

  return (
    <View className="flex-1 p-2">
      {/* top */}
      <View className={`flex-row ${styles.flexBetween} mb-6`}>
        <TouchableOpacity onPress={closeModal}>
          <MaterialIcons name="close" size={35} />
        </TouchableOpacity>
        <View className="w-[110px]">
          <ButtonBlue title="Reply" onPress={handleComment} />
        </View>
      </View>
      {/* main */}
      <View className="flex-row space-x-3">
        <View className="space-y-2">
          <Avatar imgUrl={assets.defaultProfile} size={55} />
          <Text className="text-center text-[10px] font-InterLight">
            {commentInput.length}/500
          </Text>
        </View>
        <View className="flex-1 space-y-2">
          <Text className="font-InterRegular text-gray-600">
            Replying to{" "}
            <Text className="text-blue font-InterSemiBold">{username}</Text>
          </Text>
          <ScrollView className="mb-20">
            <TextInput
              placeholder="Tweet your reply"
              className="font-InterRegular text-lg"
              value={commentInput}
              onChangeText={(input) => setCommentInput(input)}
              autoFocus={true}
              multiline
              maxLength={500}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default TweetCard;
