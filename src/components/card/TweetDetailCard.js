import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { Avatar, TweetInteraction } from "../common";
import { formatRelativeTime } from "../../utils";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const TweetDetailCard = ({
  item,
  goToVisitProfile,
  openBottomModal,
  openModalSendComment,
}) => {
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
    <View className="px-3 py-2 mb-2 border-b border-gray-300">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-4">
          <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
          <View>
            <Text className="font-InterBold">{item.username}</Text>
            <Text className="text-[12px] text-grayCustom">
              {formatRelativeTime(item.date)}
            </Text>
          </View>
        </View>
        <Pressable onPress={openBottomModal}>
          <MaterialIcons name="more-vert" size={25} />
        </Pressable>
      </View>
      {/* tweets */}
      <Text className="font-InterRegular text-[17px]">{item.tweet}</Text>
      <View className="my-2">
        <TweetInteraction
          numsLike={numsLike}
          isLiked={isLiked}
          handleLike={handleLike}
          numberOfComments={item.numberOfComments}
          openModalSendComment={openModalSendComment}
        />
      </View>
    </View>
  );
};

export default TweetDetailCard;
