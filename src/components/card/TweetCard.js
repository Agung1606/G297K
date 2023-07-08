import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Avatar, TweetInteraction } from "../common";
import { formatRelativeTime } from "../../utils";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const TweetCard = ({ item }) => {
  const navigation = useNavigation();

  const goToDetails = useCallback(() => {
    navigation.navigate("DetailsTweetScreen", { param: item });
  }, [navigation, item]);

  const goToVisitProfile = useCallback(() => {
    navigation.navigate("VisitProfileScreen", {
      param: { username: item.username, userId: item.userId },
    });
  }, [navigation, item]);

  const openModalSendComment = useCallback(() => {
    navigation.navigate("SendComment", { param: item });
  }, [navigation, item]);

  const loggedInUserData = useSelector((state) => state.global.user);
  const [isLiked, setIsLiked] = useState(false);
  const [numsLike, setNumsLike] = useState(0);

  const handleLike = useCallback(async () => {
    const likesCollection = collection(
      FIREBASE_FIRESTORE,
      `tweets/${item.id}/likes`
    );

    try {
      if (isLiked) {
        const querySnapshot = await getDocs(likesCollection);
        const likeDoc = querySnapshot.docs.find(
          (doc) => doc.data().userId === loggedInUserData.id
        );

        if (likeDoc) await deleteDoc(likeDoc.ref);
      } else {
        await addDoc(likesCollection, {
          name: loggedInUserData.name,
          profile: loggedInUserData.profile,
          userId: loggedInUserData.id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [isLiked, item.id, loggedInUserData]);

  useEffect(() => {
    const likesCollection = collection(
      FIREBASE_FIRESTORE,
      `tweets/${item.id}/likes`
    );
    const unsubcribe = onSnapshot(likesCollection, (response) => {
      const likes = response.docs.map((doc) => doc.data());
      const isLiked = likes.some((like) => like.userId === loggedInUserData.id);

      setNumsLike(likes.length);
      setIsLiked(isLiked);
    });

    return () => unsubcribe();
  }, [item.id, loggedInUserData.id]);

  return (
    <StyledPressable
      onPress={goToDetails}
      className="flex-row space-x-2 active:bg-grayCustom/10 p-2 border-b border-gray-300"
    >
      {/* profile */}
      <View>
        <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
      </View>
      {/* wrapper */}
      <View className="flex-1">
        {/* username and date */}
        <View className="mb-1">
          <Text className="font-InterBold">{item.username}</Text>
          <Text className="text-[12px] text-gray-400">
            {formatRelativeTime(item.date)}
          </Text>
        </View>
        {/* tweets, Note: this is a little bit tricky code */}
        <Text className="mb-2">
          <Text className="font-RobotoRegular text-[15px]">
            {item.tweet.slice(0, 550)}
          </Text>
          {item.tweet.length > 550 && (
            <Text className="text-blue font-RobotoRegular text-[15px]">
              ...Baca Lebih Lanjut
            </Text>
          )}
        </Text>
        {/* like, comment, and share */}
        <TweetInteraction
          numsLike={numsLike}
          isLiked={isLiked}
          handleLike={handleLike}
          numberOfComments={item.numberOfComments}
          openModalSendComment={openModalSendComment}
        />
      </View>
    </StyledPressable>
  );
};

export default React.memo(TweetCard);
