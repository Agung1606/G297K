import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "../../style/Global";
import { loggedInUser } from "../../hooks";
import { Avatar } from "../../components";

const Header = () => (
  <View className={`flex-row ${styles.flexBetween}`}>
    <View className="flex-row items-center space-x-10">
      <TouchableOpacity>
        <MaterialIcons name="close" size={35} />
      </TouchableOpacity>
      <Text className="font-InterSemiBold text-xl">Edit profile</Text>
    </View>
    <TouchableOpacity>
      <MaterialIcons name="check" size={35} color={"#1D7ED8"} />
    </TouchableOpacity>
  </View>
);

const EditProfile = () => {
  const { data } = loggedInUser();
  return (
    <SafeAreaView className="flex-1 p-3">
      <Header />
      <View className={`mt-8 ${styles.flexCenter} space-y-10`}>
        <View className="items-center">
          <Avatar imgUrl={{ uri: data.profile }} size={80} />
          <Text>Edit picture</Text>
        </View>
        {/* text input */}
        <View className="w-full">
          <TextInput placeholder="name" className="bg-red-600" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
