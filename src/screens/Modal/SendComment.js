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

import { ButtonBlue, Avatar } from "../../components";

const SendComment = ({ route, navigation }) => {
  const { item } = route?.params;
  const loggedInUserData = useSelector((state) => state.global.user);
  const goToPrevScreen = () => navigation.goBack();

  const [commentInput, setCommentInput] = useState("");
  const handleComment = () => {};

  return (
    <SafeAreaView className="flex-1 px-2 py-4 ">
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
