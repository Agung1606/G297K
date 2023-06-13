import { TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const ScrollToTop = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-6 right-2 bg-blue rounded-full p-2"
    >
      <AntDesign name="arrowup" size={24} color={"white"} />
    </TouchableOpacity>
  );
}

export default ScrollToTop