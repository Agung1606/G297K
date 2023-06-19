import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components'

const Settings = () => {
  return (
    <SafeAreaView>
      <Header text={"Settings And Privacy"} />
    </SafeAreaView>
  )
}

export default Settings