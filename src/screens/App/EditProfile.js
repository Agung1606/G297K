import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import { useSelector, useDispatch } from "react-redux";
import { setUpdateUser } from "../../redux/globalSlice";

import { Avatar, ButtonBlue, DialogModal } from "../../components";
import { modalPopupConfig } from "../../hooks";
import { pickImageAsync } from "../../utils";

import { editHandler } from "../../services/user";

const EditProfile = ({ navigation }) => {
  const goToPrevScreen = () => navigation.goBack();

  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state) => state.global.user);

  const { isModalOpen, openModal, closeModal } = modalPopupConfig();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(loggedInUserData.name);
  const [username, setUsername] = useState(loggedInUserData.username);
  const [bio, setBio] = useState(loggedInUserData.bio);

  return (
    <SafeAreaView className="flex-1">
      <Spinner visible={loading} textContent="Tunggu..." />
      {/* top */}
      <View className="px-2 py-4 flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="close" size={30} />
        </TouchableOpacity>
        <View className="w-[110px]">
          <ButtonBlue
            title={"Selesai"}
            onPress={() =>
              editHandler(
                selectedImage,
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
              selectedImage === null &&
              name === loggedInUserData.name &&
              username === loggedInUserData.username &&
              bio === loggedInUserData.bio
            }
          />
        </View>
      </View>
      {/* */}
      <View className="h-[70vh] justify-center items-center space-y-6 px-4">
        {/* edit profile */}
        <View className="items-center my-2">
          <Avatar
            imgUrl={selectedImage ? selectedImage : loggedInUserData.profile}
            size={100}
            onPress={() => pickImageAsync(setSelectedImage)}
          />
        </View>
        {/* edit card */}
        <View className="bg-gray-200 w-full p-3 rounded-md shadow-sm shadow-grayCustom">
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            className="bg-transparent mb-3"
            label="Nama"
            mode="outlined"
            activeOutlineColor="#1D7ED8"
          />
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            className="bg-transparent mb-3"
            label="Username"
            mode="outlined"
            activeOutlineColor="#1D7ED8"
          />
          <TextInput
            value={bio}
            onChangeText={(text) => setBio(text)}
            className="bg-transparent mb-3"
            label="Bio"
            mode="outlined"
            multiline={true}
            maxLength={100}
            activeOutlineColor="#1D7ED8"
          />
        </View>
      </View>
      {/* dialog modal */}
      <DialogModal
        isModalOpen={isModalOpen}
        msg={errorMsg}
        closeModal={closeModal}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
