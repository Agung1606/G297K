import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Avatar, Interaction } from "../components";
import { COMMENTS } from "../constant";
import { bottomModalConfig } from "../hooks";
import { styles } from "../style/Global";

const DetailsTweet = ({ route, navigation }) => {
  const item = route?.params?.param;
  const goToPrevScreen = () => navigation.goBack();
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", { param: item.userId });

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
      <FlatList
        ListHeaderComponent={
          <Tweet item={item} goToVisitProfile={goToVisitProfile} />
        }
        data={COMMENTS}
        renderItem={({ item }) => <Comment item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const Tweet = ({ item, goToVisitProfile }) => (
  <View className="px-3 py-2 mb-2 border-b border-gray-300">
    <View className={`flex-row ${styles.flexBetween} mb-2`}>
      <View className="flex-row items-center space-x-4">
        <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
        <View>
          <View className="flex-row items-center space-x-1">
            <Text className="font-InterBold">{item.name}</Text>
            <Text className="font-InterRegular text-xs text-grayCustom">
              @{item.username}
            </Text>
          </View>
          <Text className="text-[12px] text-gray-400">{item.date}</Text>
        </View>
      </View>
      <BtnMoreVert tweetId={item.id} username={item.username} />
    </View>
    {/* tweets */}
    <Text className="font-InterRegular text-[17px]">{item.tweet}</Text>
    <View className="my-4">
      <Interaction
        name={item.name}
        numberOfLikes={item.numberOfLikes}
        numberOfComments={item.numberOfComments}
      />
    </View>
  </View>
);

const BtnMoreVert = ({ tweetId, username }) => {
  const { bottomSheetModalRef, snapPoints, openModal, renderBackdrop } =
    bottomModalConfig(["15%"]);

  const options = [
    {
      icon: <MaterialIcons name="person-add" size={30} />,
      text: `Follow @${username}`,
    },
    {
      icon: <MaterialIcons name="report" size={30} />,
      text: "Report Tweet",
    },
  ];

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        <MaterialIcons name="more-vert" size={25} />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View className="px-6 space-y-3">
          {options.map((item) => (
            <TouchableOpacity
              key={item.text}
              className="flex-row items-center space-x-2"
            >
              {item.icon}
              <Text className="font-InterMedium text-[16px]">{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetModal>
    </>
  );
};

const Comment = ({ item }) => (
  <View className="my-2 p-2 flex-row space-x-2 border-b border-gray-300/50">
    <Avatar imgUrl={{ uri: item.profile }} size={30} />
    <View className="flex-1">
      <View className={`flex-row items-center`}>
        <Text className="font-InterMedium text-grayCustom text-xs">{`${item.name} * `}</Text>
        <Text className="font-InterLight text-[10px] text-grayCustom">
          {item.date}
        </Text>
      </View>
      <Text className="font-InterRegular">{item.comment}</Text>
    </View>
  </View>
);

export default DetailsTweet;
