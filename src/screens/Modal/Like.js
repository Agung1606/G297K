import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";

import { Header } from "../../components/common";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const Like = ({ navigation, route }) => {
  const tweetId = route?.params?.param;
  const goToPrevScreen = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [likesData, setLikesData] = useState([]);

  useEffect(() => {
    const getLikesData = async () => {
      const likesCollection = collection(
        FIREBASE_FIRESTORE,
        `tweets/${tweetId}/likes`
      );

      try {
        const snapshot = await getDocs(likesCollection);
        const likes = snapshot.docs.map((doc) => doc.data());
        setLikesData(likes);
      } catch (error) {
        console.error(error);
      }
    };

    getLikesData();
  }, [tweetId]);

  return (
    <SafeAreaView className="flex-1">
      <Header onPress={goToPrevScreen} text={"Likes"} />
    </SafeAreaView>
  );
};

export default Like;
