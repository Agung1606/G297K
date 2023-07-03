import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/globalSlice";

import { ButtonBlue, ButtonTransparent, DialogModal } from "../../components";
import { useKeyboardVisible, modalPopupConfig } from "../../hooks";
import { assets } from "../../constant";
import { styles } from "../../style/Global";

import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const Login = ({ navigation }) => {
  const persistedEmail = useSelector((state) => state.global.user?.email);
  const dispatch = useDispatch();
  const [loginInput, setLoginInput] = useState({
    email: persistedEmail,
    password: "",
  });

  const isKeyboardVisible = useKeyboardVisible();
  const { isModalOpen, openModal, closeModal } = modalPopupConfig();

  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleHidePassword = () => setHidePassword(!hidePassword);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        loginInput.email,
        loginInput.password
      );
      if (response.user) {
        const q = query(
          collection(FIREBASE_FIRESTORE, "users"),
          where("email", "==", loginInput.email)
        );

        onSnapshot(q, (res) => {
          dispatch(
            setLogin({
              user: res.docs.map((doc) => ({
                id: doc.id,
                email: doc.data().email,
                username: doc.data().username,
                name: doc.data().name,
                profile: doc.data().profile,
                followers: doc.data().followers,
                following: doc.data().following,
                bio: doc.data().bio,
              }))[0],
              token: response.user.accessToken,
            })
          );
        });
      }
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorMsg("Email tidak valid❗");
      } else if (error.code === "auth/missing-password") {
        setErrorMsg("Tolong masukan password 🙏");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("Password salah❗");
      } else if (error.code === "auth/user-not-found") {
        setErrorMsg("User tidak ditemukan 😭");
      }
      openModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-[6px]">
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
            value={loginInput.email}
            onChangeText={(text) =>
              setLoginInput({ ...loginInput, email: text })
            }
          />
        </View>
        {/* password */}
        <View className={`${styles.inputStyle} mb-5`}>
          <TextInput
            placeholder="Kata sandi"
            className="font-InterBold text-[16px]"
            secureTextEntry={hidePassword}
            value={loginInput.password}
            onChangeText={(text) =>
              setLoginInput({ ...loginInput, password: text })
            }
          />
          <View className="absolute right-4">
            {loginInput.password && (
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
        <ButtonBlue
          disabled={!loginInput.email}
          title={loading ? "Tunggu..." : "Masuk"}
          onPress={handleLogin}
        />
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
    </View>
  );
};

export default Login;

// const userQuerySnapShot = await getDocs(
//   query(
//     collection(FIREBASE_FIRESTORE, "users"),
//     where("email", "==", loginInput.email)
//   )
// );

// if (!userQuerySnapShot.empty) {
//   const userId = userQuerySnapShot.docs[0].id;
//   const userData = userQuerySnapShot.docs[0].data();

//   dispatch(
//     setLogin({
//       user: {
//         id: userId,
//         email: userData.email,
//         username: userData.username,
//         name: userData.name,
//         profile: userData.profile,
//         followers: userData.followers,
//         following: userData.following,
//         bio: userData.bio,
//       },
//       token: response.user.accessToken,
//     })
//   );
// }
