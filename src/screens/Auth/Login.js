import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/globalSlice";

import { ButtonBlue, ButtonTransparent, DialogModal } from "../../components";
import { useKeyboardVisible, useModalPopup } from "../../hooks";
import { assets } from "../../constant";
import { styles } from "../../style/Global";

import { signIn } from "../../services/auth";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = ({ navigation }) => {
  const persistedEmail = useSelector((state) => state.global.user?.email);

  const [email, setEmail] = useState(persistedEmail);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  const isKeyboardVisible = useKeyboardVisible();
  const [isModalOpen, openModal, closeModal] = useModalPopup();

  const handleHidePassword = () => setHidePassword(!hidePassword);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signIn(email, password);
      if (response) {
        const collectionRef = collection(FIREBASE_FIRESTORE, "users");
        const documentRef = query(collectionRef, where("email", "==", email));

        const userData = await getDocs(documentRef);

        dispatch(
          setLogin({
            user: {
              id: userData.docs[0].id,
              email: userData.docs[0].data().email,
              username: userData.docs[0].data().username,
              name: userData.docs[0].data().name,
              profile: userData.docs[0].data().profile,
              followers: userData.docs[0].data().followers,
              following: userData.docs[0].data().following,
              bio: userData.docs[0].data().bio,
            },
            token: response.accessToken,
          })
        );
      }
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorMsg("Email tidak valid❗❗❗");
      } else if (error.code === "auth/missing-password") {
        setErrorMsg("Tolong masukan password 😭🙏");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("Password salah❗❗❗");
      } else if (error.code === "auth/user-not-found") {
        setErrorMsg("User tidak ditemukan 😭🙏");
      }
      openModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center px-[6px]"
    >
      <Spinner visible={loading} textContent="Tunggu..." />
      <LinearGradient
        // Background Linear Gradient
        colors={["#C9D6FF", "#E2E2E2"]}
        start={[0.2, 0]}
        end={[1, 1]}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      {/* logo */}
      <Image
        source={assets.logoGrk}
        alt="logo-grk"
        className="w-[200px] h-[60px]"
      />
      {/* form login wrapper */}
      <View className="w-full h-auto p-4">
        {/* email */}
        <View className={`${styles.inputStyle} mb-3`}>
          <TextInput
            placeholder="Email"
            className="font-InterBold text-[16px]"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* password */}
        <View className={`${styles.inputStyle} mb-5`}>
          <TextInput
            placeholder="Kata sandi"
            className="font-InterBold text-[16px]"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View className="absolute right-4">
            {password && (
              <TouchableOpacity onPress={handleHidePassword}>
                <Entypo
                  name={hidePassword ? "eye-with-line" : "eye"}
                  size={22}
                  color={styles.gray}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* button login */}
        <ButtonBlue disabled={!email} title={"Masuk"} onPress={handleLogin} />
      </View>
      {/* forget password */}
      <TouchableOpacity>
        <Text className="font-InterSemiBold">Lupa kata sandi?</Text>
      </TouchableOpacity>
      {/* create new account */}
      {!isKeyboardVisible && (
        <View className="w-[90%] absolute bottom-3 space-y-1">
          <ButtonTransparent
            title={"Buat akun baru"}
            borderColor={"border-blue"}
            onPress={() => navigation.navigate("RegisterScreen")}
          />
          <Text className="text-center font-LoraBold tracking-wider text-gray-600">
            G297K
          </Text>
        </View>
      )}
      {/* simple modal */}
      <DialogModal
        isModalOpen={isModalOpen}
        msg={errorMsg}
        closeModal={closeModal}
      />
    </KeyboardAvoidingView>
  );
};

export default Login;
