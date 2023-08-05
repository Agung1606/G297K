import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { registerForPushNotificationsAsync } from "../../utils";
import { scrollToTopConfig } from "../../hooks";
import {
  TweetCard,
  SplashTweetCard,
  ButtonScrollToTop,
} from "../../components";

import { getTweets } from "../../services/tweet";

const Home = () => {
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

  useEffect(() => {
    if (Platform.OS === "android") registerForPushNotificationsAsync();
    getTweets(setDataTweets);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {dataTweets.length === 0 ? (
        <ScrollView>
          <SplashTweetCard />
          <SplashTweetCard />
          <SplashTweetCard />
          <SplashTweetCard />
          <SplashTweetCard />
        </ScrollView>
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

export default React.memo(Home);
