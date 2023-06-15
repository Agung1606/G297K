import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
import { store } from "./src/redux";

import { Login, Register } from "./src/screens/Auth";
import BottomNavigation from "./src/screens/Bottom";
import {
  Message,
  UploadTweet,
  VisitProfile,
  DetailsTweet,
  TrendingList,
  SearchAccount,
} from "./src/screens/App";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: "transparent",
  },
};

const Stack = createNativeStackNavigator();

const Routes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* auth screens */}
    <Stack.Group>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
    </Stack.Group>
    {/* bottom navigation for Home, Explore, Notification, and Profile */}
    <Stack.Screen
      name="BottomNavigation"
      component={BottomNavigation}
      options={{
        animation: "slide_from_right",
      }}
    />
    {/* app navigation */}
    <Stack.Group>
      <Stack.Screen
        name="MessageScreen"
        component={Message}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="UploadTweetScreen"
        component={UploadTweet}
        options={{
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="VisitProfileScreen"
        component={VisitProfile}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="DetailsTweetScreen"
        component={DetailsTweet}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="TrendingListScreen"
        component={TrendingList}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="SearchAccountScreen"
        component={SearchAccount}
        options={{
          animation: "none",
        }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

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

  if (!loaded) return null; // wait until the fonts loaded
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistStore(store)}> */}
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <PaperProvider>
            <NavigationContainer theme={theme}>
              <Routes />
            </NavigationContainer>
          </PaperProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      {/* </PersistGate> */}
    </Provider>
  );
}
