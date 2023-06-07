import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { styles } from '../../../style/Global'

const Search = () => {
  return (
    <SafeAreaView className="flex-1 mx-4">
      <View className={`flex-row ${styles.flexBetween} p-2`}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={22} />
        </TouchableOpacity>
        <View className="flex-1 px-4 py-2 ml-6">
          <TextInput
            placeholder="Search Account"
            className="font-InterMedium text-gray-600"
            autoFocus={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Search