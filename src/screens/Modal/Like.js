import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";

import { Header, Avatar } from "../../components/common";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

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
          <StyledPressable
            className="flex-row items-center space-x-2 active:bg-gray-300/50 px-2 py-1"
            onPress={() =>
              navigation.navigate("VisitProfileScreen", {
                param: { username: item.username, userId: item.userId },
              })
            }
          >
            <Avatar imgUrl={item.profile} size={40} />
            <Text className="font-RobotoRegular text-[16px]">
              {item.username}
            </Text>
          </StyledPressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Like;
