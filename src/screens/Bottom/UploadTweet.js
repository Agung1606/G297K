import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import { ButtonBlue, ButtonUploadType, Avatar } from "../../components";
import { useSelector } from "react-redux";

import { addTweet } from "../../services/tweet";

const UploadTweet = ({ navigation }) => {
  const loggedInUserData = useSelector((state) => state.global.user);
  const goToPrevScreen = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [loading, setLoading] = useState(false);
  const [tweetInput, setTweetInput] = useState("");

  const handleUploadTweet = async () => {
    setLoading(true);
    try {
      await addTweet(loggedInUserData, tweetInput);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-2 py-4">
      <Spinner visible={loading} textContent="Tunggu..." />
      {/* top */}
      <View className={`flex-row justify-between items-center mb-6`}>
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="close" size={35} />
        </TouchableOpacity>
        <View className="w-[110px]">
          <ButtonBlue
            disabled={!tweetInput}
            title="Upload"
            onPress={handleUploadTweet}
          />
        </View>
      </View>
      {/* main */}
      <View className="flex-row space-x-3">
        <View className="space-y-2">
          <Avatar imgUrl={loggedInUserData.profile} size={55} />
          <Text className="text-center text-[10px] font-InterLight text-grayCustom">
            {tweetInput.length}/2000
          </Text>
        </View>
        <View className="flex-1 space-y-2">
          <View className="w-24">
            <ButtonUploadType />
          </View>
          <ScrollView className="mb-20">
            <TextInput
              placeholder={`Apa yang terjadi?`}
              className="font-RobotoRegular text-[15px]"
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
