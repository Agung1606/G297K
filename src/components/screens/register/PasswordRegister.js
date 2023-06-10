import { View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";

import HeaderRegister from "../../common/HeaderRegister";
import { styles } from "../../../style/Global";
import { ButtonBlue } from "../../common/Button";

const PasswordRegister = () => {
  const navigation = useNavigation();
  const goToPrevScreen = () => navigation.goBack();

  const [passwordInput, setPasswordInput] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const handleHidePassword = () => setHidePassword(!hidePassword);
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        // Background Linear Gradient
        colors={["#f3fffb", "#defff8"]}
        start={[0.2, 0]}
        end={[1, 1]}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      <View className="mt-8 mx-3 space-y-5">
        <HeaderRegister
          title="Buat kata sandi"
          subtitle="Buat kata sandi dengan setidaknya 6 huruf dan angka. Itu harus menjadi sesuatu yang tidak bisa ditebak orang lain."
          onPress={goToPrevScreen}
        />
        <View>
          {/* password input */}
          <View className={`${styles.inputStyle} mb-6`}>
            <TextInput
              placeholder="Kata sandi"
              className="font-InterBold text-[16px]"
              secureTextEntry={hidePassword}
              value={passwordInput}
              onChangeText={(text) => setPasswordInput(text)}
            />
            <View className="absolute right-4">
              {passwordInput && (
                <TouchableOpacity onPress={handleHidePassword}>
                  <Entypo
                    name={hidePassword ? "eye" : "eye-with-line"}
                    size={22}
                    color={styles.gray}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <ButtonBlue title={"Buat akun"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordRegister;
