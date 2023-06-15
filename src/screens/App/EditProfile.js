import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

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
      <View className="items-center my-6">
        <Avatar imgUrl={{ uri: data.profile }} size={90} />
        <Text className="font-InterMedium text-lg text-grayCustom">
          Edit gambar
        </Text>
      </View>
      {/* text input */}
      <View>
        <TextInput
          label={"Name"}
          value={data.name}
          className="bg-transparent mb-3"
          underlineColor="#1D7ED8"
          />
        <TextInput
          label={"Username"}
          value={data.username}
          className="bg-transparent mb-3"
          underlineColor="#1D7ED8"
          />
        <TextInput
          label={"Bio"}
          value={data.bio}
          multiline={true}
          className="bg-transparent mb-3"
          underlineColor="#1D7ED8"
          />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
