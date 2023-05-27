import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { ButtonBlue, ButtonTransparent } from "../components";
import { styles } from "../style/Global";
import { useKeyboardVisible } from "../hooks";
import { Entypo } from "@expo/vector-icons";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  const [hidePassword, setHidePassword] = useState(true);
  const handleHidePassword = () => setHidePassword(!hidePassword);
  const isKeyboardVisible = useKeyboardVisible();

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
      <View className="absolute top-24">
        <Text className="text-4xl font-LoraBold">Logo</Text>
      </View>
      {/* form login wrapper */}
      <View className="w-full h-auto p-4 items-center">
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
                  name={hidePassword ? "eye" : "eye-with-line"}
                  size={22}
                  color={styles.gray}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* button login */}
        <ButtonBlue title={"Log in"} />
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
          />
          <Text className="text-center font-LoraBold tracking-wider text-gray-600">
            G297K
          </Text>
        </View>
      )}
    </View>
  );
};

export default Login;
