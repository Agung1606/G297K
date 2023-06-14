import {
  View,
  Text,
  SectionList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { styles } from "../style/Global";
import { NOTIFICATION } from "../constant";
import { Avatar, ButtonFollow } from "../components";

const Header = ({ goToPrevScreen }) => (
  <View className="flex-row items-center space-x-10 mb-8">
    <StyledPressable onPress={goToPrevScreen}>
      <MaterialIcons name="arrow-back" size={30} />
    </StyledPressable>
    <Text className="font-InterSemiBold text-xl">Notifications</Text>
  </View>
);

const Notification = ({ navigation }) => {
  const goToPrevScreen = () => navigation.goBack();

  return (
    <SafeAreaView className="flex-1 m-2">
      <Header goToPrevScreen={goToPrevScreen} />
      <SectionList
        sections={NOTIFICATION}
        renderSectionHeader={({ section }) => (
          <Text className="font-InterMedium text-lg mb-2">{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <StyledPressable
            onPress={() =>
              navigation.navigate("VisitProfileScreen", { param: item.id })
            }
            className={`mb-3 p-2 flex-row ${styles.flexBetween} active:bg-gray-600/50`}
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
              <ButtonFollow
                title={"Ikuti Balik"}
              />
            </View>
          </StyledPressable>
        )}
        keyExtractor={(item) => `basicListEntry-${item.id}`}
      />
    </SafeAreaView>
  );
};

export default Notification;
