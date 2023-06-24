import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { HeaderRegister, ButtonBlue } from "../../common";
import { styles } from "../../../style/Global";
import { generateRandomUsername } from "../../../utils";

import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const UsernameRegister = ({ route }) => {
  const { email, password } = route?.params?.param;
  const [username, setUsername] = useState(
    generateRandomUsername(email.match(/^([^@]+)/)[1])
  );

  const [loading, setLoading] = useState(false);
  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      if (response.user) {
        console.log(response.user);
      }
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        // Background Linear Gradient
        colors={["#DCF8EF", "#D5FEFD"]}
        start={[0.2, 0]}
        end={[1, 1]}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      <View className="mt-8 mx-3 space-y-5">
        <HeaderRegister
          title="Buat username"
          subtitle="Tambahkan username. Kamu bisa merubah ini kapanpun."
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
          <ButtonBlue
            title={loading ? "Tunggu..." : "Buat akun"}
            onPress={handleCreateAccount}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UsernameRegister;

// const [loading, setLoading] = useState(false);
// const navigation = useNavigation();
// const goToHomeScreen = () => {
//   setLoading(true);
//   setTimeout(() => {
//     setLoading(false)
//     navigation.navigate("BottomNavigation", { screen: "HomeScreen" });
//   }, 200);
// };
