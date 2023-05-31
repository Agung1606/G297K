import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const EmailRegister = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        onPress={() => navigation.navigate("PasswordRegisterScreen")}
      >
        <Text>Email Register</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EmailRegister