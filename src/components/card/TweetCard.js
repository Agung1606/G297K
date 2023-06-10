import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Avatar from "../common/Avatar";
import { bottomModalConfig, loggedInUser } from "../../hooks";
import { ButtonBlue } from "../common/Button";
import { styles } from "../../style/Global";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

const TweetCard = ({ item }) => {
  const navigation = useNavigation();
  const goToDetails = () =>
    navigation.navigate("DetailsTweetScreen", { param: item });
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", { param: item.userId });

  return (
    <View className="px-3 py-2 mb-2 border-b border-gray-300">
      {/* container */}
      <View className="flex-row space-x-2">
        {/* profile */}
        <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
        {/* wrapper */}
        <View className="flex-1">
          <StyledPressable
            onPress={goToDetails}
            className="active:bg-gray-600/20 rounded-lg mb-2"
          >
            {/* username and date */}
            <View className="mb-1">
              <View className="flex-row items-center space-x-1">
                <Text className="font-InterBold">{item.name}</Text>
                <Text className="font-InterRegular text-xs text-grayCustom">
                  @{item.username}
                </Text>
              </View>
              <Text className="text-[12px] text-gray-400">{item.date}</Text>
            </View>
            {/* tweets, Note: this is a little bit tricky code */}
            <Text>
              <Text className="font-InterRegular">
                {item.tweet.slice(0, 550)}
              </Text>
              {item.tweet.length > 550 && (
                <Text className="text-blue font-InterSemiBold">
                  ...Baca Lebih Lanjut
                </Text>
              )}
            </Text>
          </StyledPressable>
          {/* like, comment, and share */}
          <Interaction
            id={item.id}
            name={item.name}
            numberOfLikes={item.numberOfLikes}
            numberOfComments={item.numberOfComments}
          />
        </View>
      </View>
    </View>
  );
};

export const Interaction = ({ id, name, numberOfLikes, numberOfComments }) => {
  const { data: loggedInUserData } = loggedInUser();

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
          <Text className="text-grayCustom">{likesCount}</Text>
        </View>
        {/* comment */}
        <View className={`${styles.iconInteractionWrapper}`}>
          <TouchableOpacity onPress={openModal}>
            <FontAwesome name="comment-o" size={22} color="#7d7d7d" />
          </TouchableOpacity>
          <Text className="text-grayCustom">{numberOfComments}</Text>
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
        <SendComment
          loggedInUserData={loggedInUserData}
          name={name}
          closeModal={closeModal}
        />
      </BottomSheetModal>
    </>
  );
};

const SendComment = ({ loggedInUserData, name, closeModal }) => {
  const [commentInput, setCommentInput] = useState("");
  const handleComment = () => {
    if (!commentInput) {
      alert("Give me some word");
    } else {
      alert("Send to database");
    }
  };

  return (
    <View className="flex-1 px-2 py-4">
      {/* top */}
      <View className={`flex-row ${styles.flexBetween} mb-6`}>
        <TouchableOpacity onPress={closeModal}>
          <MaterialIcons name="close" size={35} />
        </TouchableOpacity>
        <View className="w-[110px]">
          <ButtonBlue title="Kirim" onPress={handleComment} />
        </View>
      </View>
      {/* main */}
      <View className="flex-row space-x-3">
        <View className="space-y-2">
          <Avatar imgUrl={{ uri: loggedInUserData.profile }} size={55} />
          <Text className="text-center text-[10px] font-InterLight text-grayCustom">
            {commentInput.length}/500
          </Text>
        </View>
        <View className="flex-1 space-y-2">
          <Text className="font-InterRegular text-gray-600">
            Membalas{" "}
            <Text className="text-blue font-InterSemiBold">@{name}</Text>
          </Text>
          <ScrollView className="mb-20">
            <TextInput
              placeholder="Tweet balasan Anda"
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
