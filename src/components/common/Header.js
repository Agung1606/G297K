import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const Header = ({ onPress, text }) => {
  return (
    <View className="flex-row items-center space-x-10 p-2">
      <Pressable onPress={onPress}>
        <MaterialIcons name="arrow-back" size={30} />
      </Pressable>
      <Text className="font-InterSemiBold text-xl">{text}</Text>
    </View>
  )
}

export default Header