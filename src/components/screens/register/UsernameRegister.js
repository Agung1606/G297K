import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";

import { HeaderRegister, ButtonBlue } from "../../common";
import { DialogModal } from "../../reactPaper";
import { styles } from "../../../style/Global";
import { generateRandomUsername } from "../../../utils";

import { useDispatch } from "react-redux";
import { modalPopupConfig } from "../../../hooks";
import { setLogin } from "../../../redux/globalSlice";

import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

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
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      if (response.user) {
        await addDoc(collection(FIREBASE_FIRESTORE, "users"), {
          email: email,
          username: username,
          name: username,
          profile:
            "https://firebasestorage.googleapis.com/v0/b/g297k-dd26d.appspot.com/o/profiles%2FdefaultProfile.jpg?alt=media&token=00865e31-d1d6-4556-9130-fcd2a3b8ea6d",
          bio: "",
        }).then(() => {
          let q = query(
            collection(FIREBASE_FIRESTORE, "users"),
            where("email", "==", email)
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
                  bio: doc.data().bio,
                }))[0],
                token: response.user.accessToken,
              })
            );
          });
        });
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
