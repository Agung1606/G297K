import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { Avatar } from "../../components";
import { MESSAGE } from "../../constant";

const Header = ({ username, goToPrevScreen }) => (
  <View className="flex-row justify-between items-center p-2 mb-4 border-b border-gray-200">
    <View className="flex-row items-center space-x-10">
      <TouchableOpacity onPress={goToPrevScreen}>
        <MaterialIcons name="arrow-back" size={30} />
      </TouchableOpacity>
      <Text className="font-InterSemiBold text-xl">{username}</Text>
    </View>
    <TouchableOpacity>
      <SimpleLineIcons name="note" size={25} />
    </TouchableOpacity>
  </View>
);

const Message = ({ navigation }) => {
  const loggedInUserData = useSelector((state) => state.global.user);
  const goToPrevScreen = () => navigation.goBack();

  return (
    <SafeAreaView className="flex-1">
      <Header
        username={loggedInUserData.username}
        goToPrevScreen={goToPrevScreen}
      />
      <FlatList
        data={MESSAGE}
        renderItem={({ item }) => (
          <StyledPressable
            className={`flex-row justify-between items-center p-2 active:bg-gray-200`}
          >
            <View className="flex-row items-center space-x-5">
              <Avatar
                imgUrl={item.profile}
                size={60}
                onPress={() =>
                  navigation.navigate("VisitProfileScreen", {
                    param: item.username,
                  })
                }
              />
              <View>
                <Text
                  className="font-InterSemiBold max-w-[200px]"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <View className="flex-row space-x-1">
                  <Text
                    className={`font-InterMedium max-w-[160px] ${
                      item.isRead && "text-grayCustom"
                    }`}
                    numberOfLines={1}
                  >
                    {item.msgText}
                  </Text>
                  <Text
                    className={`font-InterMedium ${
                      item.isRead && "text-grayCustom"
                    }`}
                  >
                    • {item.date}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <EvilIcons name="camera" size={35} />
            </TouchableOpacity>
          </StyledPressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Message;
