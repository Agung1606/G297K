import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { changeFormat } from "../../utils";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const TweetInteraction = ({ tweetId, openModalSendComment, goToDetails }) => {
  const navigation = useNavigation();
  const goToLikeScreen = () =>
    navigation.navigate("InfoScreen", { text: "Suka", tweetId });

  const loggedInUserData = useSelector((state) => state.global.user);
  const [isLiked, setIsLiked] = useState(false);
  const [numsLike, setNumsLike] = useState(0);
  const [numsComment, setNumsComment] = useState(0);

  const handleLike = async () => {
    const likesCollection = collection(
      FIREBASE_FIRESTORE,
      `tweets/${tweetId}/likes`
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
          username: loggedInUserData.username,
          profile: loggedInUserData.profile,
          userId: loggedInUserData.id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const likesCollection = collection(
      FIREBASE_FIRESTORE,
      `tweets/${tweetId}/likes`
    );
    const commentsCollection = collection(
      FIREBASE_FIRESTORE,
      `tweets/${tweetId}/comments`
    );

    const unsubcribeComment = onSnapshot(commentsCollection, (response) => {
      const comments = response.docs.map((doc) => doc.data());
      setNumsComment(comments.length);
    });

    const unsubcribeLike = onSnapshot(likesCollection, (response) => {
      const likes = response.docs.map((doc) => doc.data());
      const isLiked = likes.find((like) => like.userId === loggedInUserData.id);

      setNumsLike(likes.length);
      setIsLiked(isLiked);
    });

    return () => {
      unsubcribeLike();
      unsubcribeComment();
    };
  }, [tweetId, loggedInUserData.id]);

  const options = [
    {
      id: 1,
      icon: isLiked ? (
        <Ionicons name="md-heart-sharp" size={26} color="red" />
      ) : (
        <Ionicons name="md-heart-outline" size={26} />
      ),
      onPress: handleLike,
    },
    {
      id: 2,
      icon: <Ionicons name="chatbubble-outline" size={22} />,
      onPress: openModalSendComment,
    },
  ];

  return (
    <View className="space-y-2">
      <View className="flex-row items-center space-x-5">
        {options.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.onPress}>
            {item.icon}
          </TouchableOpacity>
        ))}
      </View>
      {(numsLike || numsComment) && (
        <View className="flex-row items-center space-x-5">
          {numsLike && (
            <TouchableOpacity onPress={goToLikeScreen}>
              <Text className="font-InterMedium text-grayCustom">
                {changeFormat(numsLike)} Suka
              </Text>
            </TouchableOpacity>
          )}
          {numsComment && (
            <TouchableOpacity onPress={goToDetails}>
              <Text className="font-InterMedium text-grayCustom">
                {changeFormat(numsComment)} Komentar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default TweetInteraction;
