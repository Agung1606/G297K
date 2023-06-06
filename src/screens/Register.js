import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { EmailRegisterScreen, PasswordRegisterScreen } from '../components'

const Stack = createNativeStackNavigator();

const Register = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="EmailRegisterScreen"
        component={EmailRegisterScreen}
      />
      <Stack.Screen
        name="PasswordRegisterScreen"
        component={PasswordRegisterScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}

export default Register