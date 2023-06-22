import {
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import { COMMENTS } from "../../constant";
import { Header, TweetDetailCard, CommentCard } from "../../components";

const DetailsTweet = ({ route, navigation }) => {
  const item = route?.params?.param;
  const goToPrevScreen = () => navigation.goBack();
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", { param: item.userId });
  const openModalSendComment = () =>
    navigation.navigate("SendComment", { param: { name: item.name } });

  return (
    <SafeAreaView className="flex-1">
      <Header onPress={goToPrevScreen} text="Tweet" />
      {/* this configuration is just for a while */}
      <FlatList
        ListHeaderComponent={
          <TweetDetailCard
            item={item}
            goToVisitProfile={goToVisitProfile}
            openModalSendComment={openModalSendComment}
          />
        }
        data={COMMENTS}
        renderItem={({ item }) => <CommentCard item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => <View className="my-5" />}
      />
      {/* comment button that always there */}
      <View className="p-2 border-t border-grayCustom">
        <Pressable
          onPress={openModalSendComment}
          className={`flex-row justify-between items-center py-2 border-b-2 border-blue`}
        >
          <Text className="text-grayCustom font-InterMedium">
            Kirim komentar Anda
          </Text>
          <FontAwesome name="comments-o" size={20} color={"#1D7ED8"} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DetailsTweet;
