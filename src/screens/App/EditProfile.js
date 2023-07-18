import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";
import { setUpdateUser } from "../../redux/globalSlice";

import { Avatar, Header, ButtonBlue, DialogModal } from "../../components";
import { modalPopupConfig } from "../../hooks";

import { editHandler } from "../../services/user";

const EditProfile = ({ navigation }) => {
  const goToPrevScreen = () => navigation.goBack();

  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state) => state.global.user);

  const { isModalOpen, openModal, closeModal } = modalPopupConfig();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(loggedInUserData.name);
  const [username, setUsername] = useState(loggedInUserData.username);
  const [bio, setBio] = useState(loggedInUserData.bio);

  return (
    <SafeAreaView className="flex-1 p-3">
      <Header onPress={goToPrevScreen} text={"Edit Profile"} />
      <View className="items-center my-6">
        <Avatar imgUrl={loggedInUserData.profile} size={90} />
        <Text className="font-InterMedium text-lg text-grayCustom">
          Edit gambar
        </Text>
      </View>
      {/* text input */}
      <View>
        <TextInput
          label={"Nama"}
          value={name}
          onChangeText={(text) => setName(text)}
          className="bg-transparent mb-3"
          underlineColor="#1D7ED8"
        />
        <TextInput
          label={"Username"}
          value={username}
          onChangeText={(text) => setUsername(text)}
          className="bg-transparent mb-3"
          underlineColor="#1D7ED8"
        />
        <TextInput
          label={"Bio"}
          value={bio}
          onChangeText={(text) => setBio(text)}
          multiline={true}
          className="bg-transparent mb-3"
          underlineColor="#1D7ED8"
        />
        <View className="mt-4">
          <ButtonBlue
            title={loading ? "Tunggu..." : "Edit"}
            onPress={() =>
              editHandler(
                name,
                username,
                bio,
                setLoading,
                loggedInUserData,
                setErrorMsg,
                openModal,
                dispatch,
                setUpdateUser,
                goToPrevScreen
              )
            }
            disabled={
              name === loggedInUserData.name &&
              username === loggedInUserData.username &&
              bio === loggedInUserData.bio
            }
          />
        </View>
      </View>
      {/* simple modal */}
      <DialogModal
        isModalOpen={isModalOpen}
        msg={errorMsg}
        closeModal={closeModal}
      />
    </SafeAreaView>
  );
};

export default EditProfile;