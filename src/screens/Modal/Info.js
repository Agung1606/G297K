import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header, SearchUserCard } from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const Info = ({ navigation, route }) => {
  const { text, tweetId, userId } = route?.params;

  const goToPrevScreen = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const likesCollection = collection(
        FIREBASE_FIRESTORE,
        `tweets/${tweetId}/likes`
      );
      const followersCollection = collection(
        FIREBASE_FIRESTORE,
        `users/${userId}/followers`
      );
      const followingCollection = collection(
        FIREBASE_FIRESTORE,
        `users/${userId}/following`
      );

      try {
        if (text === "Suka") {
          const snapshot = await getDocs(likesCollection);
          const likes = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setData(likes);
        } else if (text === "Pengikut") {
          const snapshot = await getDocs(followersCollection);
          const followers = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setData(followers);
        } else if (text === "Mengikuti") {
          const snapshot = await getDocs(followingCollection);
          const following = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setData(following);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [tweetId]);

  return (
    <SafeAreaView className="flex-1 mx-4">
      <Header onPress={goToPrevScreen} text={text} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <SearchUserCard
            onPress={() =>
              navigation.navigate("VisitProfileScreen", {
                username: item.username,
                userId: item.userId,
              })
            }
            imgUrl={item.profile}
            name={item.name}
            username={item.username}
          />
        )}
        ListEmptyComponent={() => (
          <View className="h-screen justify-center items-center">
            <Text className="font-RobotoRegular text-lg text-grayCustom">Nothing to see here yet.</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Info;
