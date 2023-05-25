import { View, Text, StatusBar, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { ButtonBlue } from '../components'

const Login = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={["#E8DBFC", "#F8F9D2"]}
        start={[0, 0]}
        end={[1, 1]}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      <ButtonBlue width={"80%"} title={"Log in"} onPress={() => alert("login button pressed")} />
    </View>
  );
}

export default Login