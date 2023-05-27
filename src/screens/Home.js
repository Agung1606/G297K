import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons'

import { styles } from '../style/Global'

const Home = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className={`flex-row ${styles.flexBetween} my-1 px-2`}>
        <Text className="font-LoraBold text-3xl tracking-wider">G297K</Text>
        <View className={`flex-row ${styles.flexBetween} space-x-4`}>
          <TouchableOpacity>
            <EvilIcons name="plus" size={39} />
          </TouchableOpacity>
          <TouchableOpacity>
            <EvilIcons name="sc-telegram" size={39} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="m-2">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
          <View className="bg-red-500 w-full h-[200px] rounded-lg mb-4"></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Home