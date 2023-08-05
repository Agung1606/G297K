import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/globalSlice";

import { modalPopupConfig } from "../../hooks";
import { ConfirmModal } from "../../components";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { Header } from "../../components";

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state) => state.global.user);
  const goToPrevScreen = () => navigation.goBack();

  const { isModalOpen, openModal, closeModal } = modalPopupConfig();

  const SETTINGOPTIONS = [
    {
      id: 1,
      title: "Siapa yang bisa melihat konten Anda",
      data: [
        {
          id: 1,
          text: "Privasi akun",
          icon: <Ionicons name="md-lock-closed-outline" size={25} />,
        },
        {
          id: 2,
          text: "Teman Dekat",
          icon: <MaterialIcons name="stars" size={25} />,
        },
        {
          id: 3,
          text: "Diblokir",
          icon: <MaterialIcons name="block-flipped" size={25} />,
        },
      ],
    },
    {
      id: 2,
      title: "Login",
      data: [
        {
          id: 1,
          text: `Keluar ${loggedInUserData.username}`,
          isLogout: true,
          onPress: openModal,
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <Header onPress={goToPrevScreen} text={"Pengaturan dan privasi"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {SETTINGOPTIONS.map((section) => (
          <View key={section.id} className="bg-gray-100 mb-2">
            <View className="p-4">
              <Text className="text-grayCustom font-InterMedium">
                {section.title}
              </Text>
            </View>
            {section.data.map((item) => (
              <StyledPressable
                key={item.id}
                onPress={item.onPress}
                className={`flex-row justify-between items-center py-2 px-4 active:bg-gray-200`}
              >
                <View className="flex-row items-center space-x-2">
                  {item.icon}
                  <Text
                    className={`font-InterRegular ${
                      item.isLogout && "text-red-600"
                    }`}
                  >
                    {item.text}
                  </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={22} />
              </StyledPressable>
            ))}
          </View>
        ))}
      </ScrollView>
      {/* confirm modal to make sure you really wanna logout*/}
      <ConfirmModal
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onOk={() => dispatch(setLogout())}
        title={"Keluar dari akun Anda?"}
        textBtnOk={"Keluar"}
        textBtnCancel={"Batal"}
      />
    </SafeAreaView>
  );
};

export default Settings;
