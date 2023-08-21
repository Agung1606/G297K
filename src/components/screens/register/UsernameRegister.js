import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";

import { DEFAULT_PROFILE } from "@env";
import { HeaderRegister, ButtonBlue } from "../../common";
import { DialogModal } from "../../reactPaper";
import { styles } from "../../../style/Global";
import { generateRandomUsername } from "../../../utils";

import { useDispatch } from "react-redux";
import { modalPopupConfig } from "../../../hooks";
import { setLogin } from "../../../redux/globalSlice";

import { singUp } from "../../../services/auth";
import { addUser, getUser } from "../../../services/user";

const UsernameRegister = ({ route }) => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = modalPopupConfig();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { email, password } = route?.params;
  const [username, setUsername] = useState(
    generateRandomUsername(email.match(/^([^@]+)/)[1])
  );

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const response = await singUp(email, password);
      if (response) {
        const data = {
          email,
          username,
          name: username,
          profile: DEFAULT_PROFILE,
          bio: "",
        };
        await addUser(data);
        const { userId, userData } = await getUser(email);
        dispatch(
          setLogin({
            user: {
              id: userId,
              email: userData.email,
              username: userData.username,
              name: userData.name,
              profile: userData.profile,
              followers: userData.followers,
              following: userData.following,
              bio: userData.bio,
            },
            token: response.accessToken,
          })
        );
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email sudah digunakan 😢");
      }
      openModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Spinner visible={loading} textContent="Membuat akun..." />
      <LinearGradient
        // Background Linear Gradient
        colors={["#C9D6FF", "#E2E2E2"]}
        start={[0.2, 0]}
        end={[1, 1]}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      <View className="mt-8 mx-3 space-y-5">
        <HeaderRegister
          title="Buat username"
          subtitle="Tambahkan username atau gunakan saran kami. Kamu bisa merubah ini kapanpun."
        />
        <View>
          <View className={`${styles.inputStyle} mb-3`}>
            <TextInput
              placeholder="Username"
              className="font-InterBold text-[16px]"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <ButtonBlue title={"Buat akun"} onPress={handleCreateAccount} />
        </View>
      </View>
      {/* modal */}
      <DialogModal
        isModalOpen={isModalOpen}
        msg={errorMsg}
        closeModal={closeModal}
      />
    </SafeAreaView>
  );
};

export default UsernameRegister;
