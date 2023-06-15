import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "../../style/Global";
import { loggedInUser } from "../../hooks";
import { ButtonBlue, Avatar } from "../../components";

const SendComment = ({ route, navigation }) => {
  const { data: loggedInUserData } = loggedInUser();
  const { name } = route?.params?.param;
  const goToPrevScreen = () => navigation.goBack();

  const [commentInput, setCommentInput] = useState("");
  const handleComment = () => {
    if (!commentInput) {
      alert("Give me some word");
    } else {
      alert("Send to database");
    }
  };

  return (
    <SafeAreaView className="flex-1 px-2 py-4 ">
      {/* top */}
      <View className={`flex-row ${styles.flexBetween} mb-6`}>
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="close" size={35} />
        </TouchableOpacity>
        <View className="w-[110px]">
          <ButtonBlue title="Kirim" onPress={handleComment} />
        </View>
      </View>
      {/* main */}
      <View className="flex-row space-x-3">
        <View className="space-y-2">
          <Avatar imgUrl={{ uri: loggedInUserData.profile }} size={55} />
          <Text className="text-center text-[10px] font-InterLight text-grayCustom">
            {commentInput.length}/500
          </Text>
        </View>
        <View className="flex-1 space-y-2">
          <Text className="font-InterRegular text-gray-600">
            Membalas{" "}
            <Text className="text-blue font-InterSemiBold">@{name}</Text>
          </Text>
          <ScrollView className="mb-20">
            <TextInput
              placeholder="Tweet balasan Anda"
              className="font-InterRegular text-lg"
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
