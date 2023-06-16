import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "../../style/Global";
import { COMMENTS } from "../../constant";
import { TweetDetailCard, CommentCard } from "../../components";

const DetailsTweet = ({ route, navigation }) => {
  const item = route?.params?.param;
  const goToPrevScreen = () => navigation.goBack();
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", { param: item.userId });
  const openModalSendComment = () =>
    navigation.navigate("SendComment", { param: { name: item.name } });

  return (
    <SafeAreaView className="flex-1">
      <View
        className={`flex-row ${styles.flexBetween} p-2 border-b border-b-gray-600`}
      >
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="arrow-back" size={32} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-InterSemiBold">
          Tweet
        </Text>
      </View>
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
        renderItem={({ item }) => <CommentCard item={item} /> }
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default DetailsTweet;
