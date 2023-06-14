import { View, Text, TouchableOpacity, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "../style/Global";
import { assets } from "../constant";
import { Avatar, ButtonFollow } from "../components";

const Header = ({ goToPrevScreen }) => (
  <View className="flex-row items-center space-x-10 mb-8">
    <TouchableOpacity onPress={goToPrevScreen}>
      <MaterialIcons name="arrow-back" size={30} />
    </TouchableOpacity>
    <Text className="font-InterSemiBold text-xl">Notifications</Text>
  </View>
);

const Notification = ({ navigation }) => {
  const goToPrevScreen = () => navigation.goBack();

  const dummyData = [
    {
      title: "Minggu Ini",
      data: [
        {
          id: 12,
          profile: assets.jokowiProfile,
          username: "jokowi",
          time: "1d",
          isFollow: true,
        },
        {
          id: 13,
          profile: assets.lisaProfile,
          username: "lalalalisa_m",
          time: "1d",
          isFollow: false,
        },
      ],
    },
    {
      title: "Bulan Lalu",
      data: [
        {
          id: 14,
          profile: assets.liamProfile,
          username: "liamgallagher",
          time: "2w",
          isFollow: false,
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 m-2">
      <Header goToPrevScreen={goToPrevScreen} />
      <SectionList
        sections={dummyData}
        renderSectionHeader={({ section }) => (
          <Text className="font-InterMedium text-lg mb-2">{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View className={`mb-3 flex-row ${styles.flexBetween}`}>
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
                title={item.isFollow ? "Mengikuti" : "Ikuti"}
                isFollow={item.isFollow}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => `basicListEntry-${item.id}`}
      />
    </SafeAreaView>
  );
};

export default Notification;
