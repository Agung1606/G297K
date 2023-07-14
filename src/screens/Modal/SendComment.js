import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import { ButtonBlue, Avatar } from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const SendComment = ({ route, navigation }) => {
  const { item } = route?.params;
  const loggedInUserData = useSelector((state) => state.global.user);
  const goToPrevScreen = () => navigation.goBack();

  const [loading, setLoading] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const handleComment = async () => {
    setLoading(true);

    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    const timeString = currentDate.toTimeString().split(" ")[0];
    const timeZoneString = currentDate.toTimeString().split(" ")[1];

    const data = {
      userId: loggedInUserData.id,
      username: loggedInUserData.username,
      profile: loggedInUserData.profile,
      comment: commentInput,
      date: `${dateString} ${timeString} ${timeZoneString}`,
    };

    try {
      await addDoc(
        collection(FIREBASE_FIRESTORE, `tweets/${item.id}/comments`),
        data
      );
      goToPrevScreen();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-2 py-4 ">
      <Spinner visible={loading} textContent="Tunggu..." />
      {/* top */}
      <View className={`flex-row justify-between items-center mb-6`}>
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="close" size={35} />
        </TouchableOpacity>
        <View className="w-[110px]">
          <ButtonBlue
            disabled={!commentInput}
            title="Kirim"
            onPress={handleComment}
          />
        </View>
      </View>
      {/* main */}
      <View className="flex-row space-x-3">
        <View className="space-y-2">
          <Avatar imgUrl={loggedInUserData.profile} size={55} />
          <Text className="text-center text-[10px] font-InterLight text-grayCustom">
            {commentInput.length}/500
          </Text>
        </View>
        <View className="flex-1 space-y-2">
          <Text className="font-InterRegular text-gray-600">
            Membalas{" "}
            <Text className="text-blue font-InterSemiBold">
              {item.username}
            </Text>
          </Text>
          <ScrollView className="mb-20">
            <TextInput
              placeholder="Kirim balasan Anda"
              className="font-RobotoRegular text-[15px]"
              value={commentInput}
              onChangeText={(input) => setCommentInput(input)}
              autoFocus={true}
              multiline
              maxLength={500}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendComment;
