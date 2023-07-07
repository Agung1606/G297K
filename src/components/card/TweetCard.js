import React, { useCallback, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { Avatar, TweetInteraction } from "../common";
import { formatRelativeTime } from "../../utils";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  doc,
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

  const handleLike = async () => {
    const likesCollection = collection(
      FIREBASE_FIRESTORE,
      `tweets/${item.id}/likes`
    );
    try {
      if (isLiked) {
        getDocs(likesCollection)
          .then((response) => {
            let id;
            response.docs.map((doc) => {
              if (doc.data().userId === loggedInUserData.id) {
                id = doc.id;
              }
            });
            return id;
          })
          .then((response) => {
            const docRef = doc(
              collection(FIREBASE_FIRESTORE, `tweets/${item.id}/likes`),
              response
            );
            deleteDoc(docRef);
          });
      } else {
        await addDoc(likesCollection, {
          name: loggedInUserData.name,
          userId: loggedInUserData.id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useMemo(() => {
    let q = query(collection(FIREBASE_FIRESTORE, `tweets/${item.id}/likes`));
    onSnapshot(q, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      const isLiked = likes.some((like) => like.userId === loggedInUserData.id);

      setIsLiked(isLiked);
    });
  });

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
          <View className="flex-row items-center space-x-1">
            <Text className="font-InterBold">{item.name}</Text>
            <Text className="font-InterRegular text-xs text-grayCustom">
              @{item.username}
            </Text>
          </View>
          <Text className="text-[12px] text-gray-400">
            {formatRelativeTime(item.date)}
          </Text>
        </View>
        {/* tweets, Note: this is a little bit tricky code */}
        <Text className="mb-2">
          <Text className="font-InterRegular">{item.tweet.slice(0, 550)}</Text>
          {item.tweet.length > 550 && (
            <Text className="text-blue font-InterSemiBold">
              ...Baca Lebih Lanjut
            </Text>
          )}
        </Text>
        {/* like, comment, and share */}
        <TweetInteraction
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
