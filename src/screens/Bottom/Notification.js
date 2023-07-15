import { View, Text, SectionList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { NOTIFICATION } from "../../constant";
import { Header, Avatar, ButtonFollow } from "../../components";

const Notification = ({ navigation }) => {
  const goToPrevScreen = () => navigation.goBack();

  return (
    <SafeAreaView className="flex-1">
      <Header onPress={goToPrevScreen} text={"Notifications"} />
      <SectionList
        sections={NOTIFICATION}
        renderSectionHeader={({ section }) => (
          <Text className="font-InterMedium text-lg mb-2 px-2">
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <StyledPressable
            onPress={() =>
              navigation.navigate("VisitProfileScreen", {
                username: item.username,
                userId: item.userId,
              })
            }
            className={`mb-3 p-3 flex-row justify-between items-center active:bg-gray-600/50`}
          >
            <View className="flex-row items-center space-x-4">
              <Avatar imgUrl={item.profile} size={50} />
              <Text className="w-40 font-InterRegular">
                <Text className="font-InterBold">{item.username}</Text> mulai
                mengikuti Anda.{" "}
                <Text className="text-grayCustom">{item.time}</Text>
              </Text>
            </View>
            <View className="w-24">
              <ButtonFollow title={"Ikuti Balik"} />
            </View>
          </StyledPressable>
        )}
        keyExtractor={(item) => `basicListEntry-${item.id}`}
      />
    </SafeAreaView>
  );
};

export default Notification;
