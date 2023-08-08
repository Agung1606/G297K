import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const Notification = () => {
  return (
    <SafeAreaView className="flex-1 mx-4">
      <Text className="font-InterBold text-2xl">Aktifitas</Text>
      <View className="flex-1 justify-center items-center">
        <Text className="font-InterMedium text-grayCustom">Nothing to see here yet.</Text>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
