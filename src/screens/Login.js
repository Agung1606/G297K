import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { ButtonBlue, ButtonTransparent, DialogModal } from "../components";
import { assets } from "../constant";
import { styles } from "../style/Global";
import { useKeyboardVisible } from "../hooks";
import { Entypo, AntDesign } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  const isKeyboardVisible = useKeyboardVisible();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const closeModal = () => setIsModalOpen(false);
  const handleHidePassword = () => setHidePassword(!hidePassword);
  const removeUsername = () => setLoginInput({ ...loginInput, username: "" });

  const handleLogin = () => {
    if (loginInput.username && loginInput.password) {
      navigation.navigate("BottomNavTab");
    } else {
      setErrorMsg("One Piece fans!");
      setIsModalOpen(true);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-[6px]">
      <LinearGradient
        // Background Linear Gradient
        colors={["#f3fffb", "#defff8"]}
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
        {/* username */}
        <View className={`${styles.inputStyle} mb-3`}>
          <TextInput
            placeholder="Username"
            className="font-InterBold text-[16px]"
            value={loginInput.username}
            onChangeText={(text) =>
              setLoginInput({ ...loginInput, username: text })
            }
          />
          <View className="absolute right-4">
            {loginInput.username && (
              <TouchableOpacity onPress={removeUsername}>
                <AntDesign name={"close"} size={22} color={styles.gray} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* password */}
        <View className={`${styles.inputStyle} mb-6`}>
          <TextInput
            placeholder="Password"
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
        <ButtonBlue title={"Log in"} onPress={handleLogin} />
      </View>
      {/* forget password */}
      <TouchableOpacity>
        <Text className="font-InterSemiBold">Forget password?</Text>
      </TouchableOpacity>
      {/* create new account */}
      {!isKeyboardVisible && (
        <View className="w-[90%] absolute bottom-3 space-y-1">
          <ButtonTransparent
            title={"Create new account"}
            borderColor={"border-blue"}
            onPress={() => navigation.navigate("RegisterStack")}
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
