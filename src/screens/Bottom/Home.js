import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto } from "@expo/vector-icons";

import { scrollToTopConfig } from "../../hooks";
import {
  TweetCard,
  SplashTweetCard,
  BadgeNotif,
  ButtonScrollToTop,
} from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

const HeaderHome = ({ title, goToMessage }) => (
  <View
    className={`flex-row justify-between items-center py-1 px-3 border-b border-b-gray-600`}
  >
    <Text className="font-LoraBold text-3xl tracking-wider">{title}</Text>
    <TouchableOpacity onPress={goToMessage}>
      <Fontisto name="email" size={30} />
      <BadgeNotif num={5} />
    </TouchableOpacity>
  </View>
);

const Home = ({ navigation }) => {
  const goToMessage = () => navigation.navigate("MessageScreen");

  const [dataTweets, setDataTweets] = useState([]);
  const { isScrolled, reference, handleScroll, scrollToTop } =
    scrollToTopConfig({ kind: "FlatList" });

  // refresh configuration
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useMemo(() => {
    let q = query(
      collection(FIREBASE_FIRESTORE, "tweets"),
      orderBy("date", "desc")
    );
    onSnapshot(q, (response) => {
      setDataTweets(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <HeaderHome title={"G297K"} goToMessage={goToMessage} />
      {dataTweets.length === 0 ? (
        <>
          <ScrollView>
            <SplashTweetCard />
            <SplashTweetCard />
            <SplashTweetCard />
            <SplashTweetCard />
            <SplashTweetCard />
          </ScrollView>
        </>
      ) : (
        <FlatList
          ref={reference}
          onScroll={handleScroll}
          data={dataTweets}
          renderItem={({ item }) => <TweetCard item={item} />}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View className="pb-20" />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#1D7ED8"]}
            />
          }
        />
      )}
      {isScrolled && (
        <View className="absolute bottom-6 right-2">
          <ButtonScrollToTop onPress={scrollToTop} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
