import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { registerForPushNotificationsAsync } from "../../utils";
import { scrollToTopConfig } from "../../hooks";
import {
  SplashPostCard,
  PostCard,
  ButtonScrollToTop,
} from "../../components";
import { assets } from "../../constant";

import { getPosts } from "../../services/post";

import * as Location from "expo-location";

const Home = () => {
  const [dataTweets, setDataTweets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { isScrolled, reference, handleScroll, scrollToTop } =
    scrollToTopConfig({ kind: "FlatList" });

  // refresh configuration
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") registerForPushNotificationsAsync();
    getPosts(setDataTweets);

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();

  }, []);

  return (
    <SafeAreaView className="flex-1">
      {dataTweets.length === 0 ? (
        <ScrollView>
          <SplashPostCard />
          <SplashPostCard />
          <SplashPostCard />
          <SplashPostCard />
          <SplashPostCard />
        </ScrollView>
      ) : (
        <FlatList
          ref={reference}
          onScroll={handleScroll}
          data={dataTweets}
          renderItem={({ item }) => <PostCard item={item} />}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View className="justify-center items-center py-2">
              <Image
                source={assets.logoGrk}
                alt="logo-grk"
                className="w-[100px] h-[25px]"
              />
            </View>
          )}
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
