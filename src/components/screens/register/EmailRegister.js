import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { HeaderRegister, ButtonBlue } from "../../common";
import { styles } from "../../../style/Global";

const EmailRegister = () => {
  const navigation = useNavigation();
  const goToLogin = () => navigation.navigate("LoginScreen");
  const goToPasswordRegister = () =>
    navigation.navigate("PasswordRegisterScreen");

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
          title="Apa email Anda?"
          subtitle="Silakan masukkan email yang sering Anda gunakan, email Anda akan digunakan jika sewaktu-waktu Anda lupa kata sandi Anda."
          onPress={goToLogin}
          showBtn
        />
        <View>
          <View className={`${styles.inputStyle} mb-3`}>
            <TextInput
              placeholder="Email"
              className="font-InterBold text-[16px]"
            />
          </View>
          <ButtonBlue title={"Berikutnya"} onPress={goToPasswordRegister} />
        </View>
      </View>
      {/* btn have account */}
      <View className="absolute bottom-8 w-full">
        <TouchableOpacity onPress={goToLogin}>
          <Text className="text-center font-InterSemiBold text-blue">
            Sudah punya akun?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmailRegister;
