import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState} from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { loggedInUser } from "../../hooks";
import { ButtonBlue, ButtonUploadType, Avatar } from "../../components";

const UploadTweet = ({ navigation }) => {
  const { data: loggedInUserData } = loggedInUser();
  const goToPrevScreen = () => navigation.goBack();

  const [tweetInput, setTweetInput] = useState('');

  return (
    <SafeAreaView className="flex-1 px-2 py-4">
      {/* top */}
      <View className={`flex-row justify-between items-center mb-6`}>
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="close" size={35} />
        </TouchableOpacity>
        <View className="w-[110px]">
          <ButtonBlue title="Tweet" />
        </View>
      </View>
      {/* main */}
      <View className="flex-row space-x-3">
        <View className="space-y-2">
          <Avatar imgUrl={{ uri: loggedInUserData.profile }} size={55} />
          <Text className="text-center text-[10px] font-InterLight text-grayCustom">
            {tweetInput.length}/2000
          </Text>
        </View>
        <View className="flex-1 space-y-2">
          {/* this button is just for a while  */}
          <ButtonUploadType />
          <ScrollView className="mb-20">
            <TextInput
              placeholder={`Apa yang terjadi?`}
              className="font-InterRegular text-lg"
              autoFocus={true}
              multiline
              maxLength={2000}
              onChangeText={(input) => setTweetInput(input)}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadTweet;
