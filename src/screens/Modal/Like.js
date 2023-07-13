import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";

import { Header, InfoCard } from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const Like = ({ navigation, route }) => {
  const { tweetId } = route?.params;
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
        const likes = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
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
      <FlatList
        data={likesData}
        renderItem={({ item }) => (
          <InfoCard
            onPress={() =>
              navigation.navigate("VisitProfileScreen", {
                username: item.username,
                userId: item.userId,
              })
            }
            imgUrl={item.profile}
            username={item.username}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Like;
