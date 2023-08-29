import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { Formik } from "formik";
import { emailValidation } from "../../../utils";

import { HeaderRegister, ButtonBlue } from "../../common";
import { styles } from "../../../style/Global";

const EmailRegister = () => {
  const navigation = useNavigation();
  const goToLogin = () => navigation.navigate("LoginScreen");

  const handleEmailSubmit = (values) => {
    navigation.navigate("PasswordRegisterScreen", {
      email: values.email,
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
          title="Apa email Anda?"
          subtitle="Silakan masukkan email yang sering Anda gunakan."
          onPress={goToLogin}
          showBtn
        />
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailValidation}
          onSubmit={handleEmailSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <>
              <View className="my-3">
                <View className={`${styles.inputStyle}`}>
                  <TextInput
                    placeholder="Email"
                    className="font-InterBold text-[16px]"
                    value={values.email}
                    onChangeText={handleChange("email")}
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-600 font-InterLight">
                    {errors.email}
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
