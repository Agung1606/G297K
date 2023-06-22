import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import {
  EmailRegisterScreen,
  PasswordRegisterScreen,
  UsernameRegisterScreen,
} from "../../components";

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
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="UsernameRegisterScreen"
        component={UsernameRegisterScreen}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default Register;
