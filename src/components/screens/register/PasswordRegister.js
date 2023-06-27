import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { Formik } from "formik";
import { passwordValidation } from "../../../utils";

import { HeaderRegister, ButtonBlue } from "../../common";
import { styles } from "../../../style/Global";

const PasswordRegister = ({ route }) => {
  const navigation = useNavigation();
  const goToPrevScreen = () => navigation.goBack();

  const { email } = route?.params?.param;
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = () => setHidePassword(!hidePassword);
  const handleCreateAccount = (values) => {
    navigation.navigate("UsernameRegisterScreen", {
      param: {
        email,
        password: values.password,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        // Background Linear Gradient
        colors={["#C9D6FF", "#E2E2E2"]}
        start={[0.2, 0]}
        end={[1, 1]}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      <View className="mt-8 mx-3 space-y-5">
        <HeaderRegister
          title="Buat kata sandi"
          subtitle="Buat kata sandi dengan setidaknya 6 huruf dan angka. Itu harus menjadi sesuatu yang tidak bisa ditebak orang lain."
          onPress={goToPrevScreen}
          showBtn
        />
        <Formik
          initialValues={{ password: "" }}
          validationSchema={passwordValidation}
          onSubmit={handleCreateAccount}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <>
              <View className="my-3">
                {/* password input */}
                <View className={`${styles.inputStyle}`}>
                  <TextInput
                    placeholder="Kata sandi"
                    className="font-InterBold text-[16px]"
                    secureTextEntry={hidePassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                  />
                  <View className="absolute right-4">
                    {values.password && (
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
                {errors.password && (
                  <Text className="text-red-600 font-InterLight">
                    {errors.password}
                  </Text>
                )}
              </View>
              <ButtonBlue
                title={"Berikutnya"}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default PasswordRegister;
