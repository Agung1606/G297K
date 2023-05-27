import { useFonts } from 'expo-font'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import BottomNav from './src/screens';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: "transparent"
  }
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    InterBold: require("./src/assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./src/assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./src/assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./src/assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./src/assets/fonts/Inter-Light.ttf"),
    LoraBold: require("./src/assets/fonts/Lora-Bold.ttf"),
    LoraSemiBold: require("./src/assets/fonts/Lora-SemiBold.ttf"),
    LoraMedium: require("./src/assets/fonts/Lora-Medium.ttf"),
    LoraRegular: require("./src/assets/fonts/Lora-Regular.ttf"),
  });

  if(!loaded) return null; // wait until the fonts loaded
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="BottomNav" component={BottomNav} options={{ presentation: "modal", animation: "slide_from_right" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
