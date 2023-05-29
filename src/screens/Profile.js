import { View, Text } from 'react-native'
import React from 'react'

import { loggedInUser } from '../hooks'

const Profile = () => {
  const { data } = loggedInUser();
  return ( 
    <View className="flex-1 justify-center items-center">
      <Text>{data.username}</Text>
    </View>
  )
}

export default Profile;