import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { Header } from "../../components";
import { SETTINGOPTIONS } from "../../constant";

const Settings = ({ navigation }) => {
  const goToPrevScreen = () => navigation.goBack();
  return (
    <SafeAreaView className="flex-1">
      <Header onPress={goToPrevScreen} text={"Pengaturan dan privasi"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {SETTINGOPTIONS.map((section) => (
          <View key={section.id} className="bg-gray-100 mb-2">
            <View className="p-4">
              <Text className="text-grayCustom font-InterMedium">
                {section.title}
              </Text>
            </View>
            {section.data.map((item) => (
              <StyledPressable
                key={item.id}
                className={`flex-row justify-between items-center py-2 px-4 active:bg-gray-200`}
              >
                <View className="flex-row items-center space-x-2">
                  {item.icon}
                  <Text
                    className={`font-InterRegular ${
                      item.isLogout && "text-red-600"
                    }`}
                  >
                    {item.text}
                  </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={22} />
              </StyledPressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
