import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Spinner from "react-native-loading-spinner-overlay";

import { useSelector, useDispatch } from "react-redux";
import { setUpdateUser } from "../../redux/globalSlice";

import { Avatar, ButtonBlue, DialogModal } from "../../components";
import { modalPopupConfig, bottomModalConfig } from "../../hooks";
import { pickImageAsync } from "../../utils";

import { editHandler } from "../../services/user";

const EditProfile = ({ navigation }) => {
  const goToPrevScreen = () => navigation.goBack();

  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state) => state.global.user);

  const { isModalOpen, openModal, closeModal } = modalPopupConfig();
  const {
    bottomSheetModalRef,
    snapPoints,
    renderBackdrop,
    openModal: openBottomModal,
    closeModal: closeBottomModal
  } = bottomModalConfig(["18%"]);

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(loggedInUserData.name);
  const [username, setUsername] = useState(loggedInUserData.username);
  const [bio, setBio] = useState(loggedInUserData.bio);

  const profileOptions = [
    {
      id: 1,
      text: "Ganti foto profil",
      onPress: () => {
        closeBottomModal();
        pickImageAsync(setSelectedImage);
      },
    },
    {
      id: 2,
      text: "Hapus foto profil",
      delete: true,
      onPress: () => {
        setSelectedImage(
          "https://firebasestorage.googleapis.com/v0/b/g297k-dd26d.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=50a4d5c2-0eb6-4877-a795-de541e4bf054"
        );
        closeBottomModal();
      },
    },
  ];

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
            onPress={openBottomModal}
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
      {/* bottom modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        {profileOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            className="bg-gray-300 flex-row items-center justify-between mx-3 mb-2 p-3 rounded-md"
          >
            <Text
              className={`${item.delete && "text-red-600"} font-InterSemiBold`}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default EditProfile;
