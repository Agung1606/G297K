import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback } from "react";

import { TWEETS } from "../../constant";
import { scrollToTopConfig } from "../../hooks";
import { TweetCard, BadgeNotif, ScrollToTop } from "../../components";
import { styles } from "../../style/Global";
import { Fontisto } from "@expo/vector-icons";

const Header = ({ goToMessage }) => (
  <View
    className={`flex-row ${styles.flexBetween} py-1 px-3 border-b border-b-gray-600`}
  >
    <Text className="font-LoraBold text-3xl tracking-wider text-blue">G297K</Text>
    <TouchableOpacity onPress={goToMessage}>
      <Fontisto name="email" size={30} />
      <BadgeNotif num={5} />
    </TouchableOpacity>
  </View>
);

const Home = ({ navigation }) => {
  const goToMessage = () => navigation.navigate("MessageScreen");

  const { isScrolled, reference, handleScroll, scrollToTop } =
    scrollToTopConfig({ kind: "FlatList" });

  // refresh configuration
  const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

  return (
    <SafeAreaView className="flex-1">
      <Header goToMessage={goToMessage} />
      <FlatList
        ref={reference}
        onScroll={handleScroll}
        data={TWEETS}
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
      {isScrolled && <ScrollToTop onPress={scrollToTop} />}
    </SafeAreaView>
  );
};

export default Home;
