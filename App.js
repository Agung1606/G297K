import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./src/redux";

import Routes from "./src/navigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: "transparent",
  },
};

export default function App() {
  const [loaded] = useFonts({
    InterBold: require("./src/assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./src/assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./src/assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./src/assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./src/assets/fonts/Inter-Light.ttf"),
    LoraBold: require("./src/assets/fonts/Lora-Bold.ttf"),
  });
  if (!loaded) return null; // wait until the fonts loaded
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <GestureHandlerRootView className="flex-1">
          <BottomSheetModalProvider>
            <PaperProvider>
              <NavigationContainer theme={theme}>
                <Routes />
              </NavigationContainer>
            </PaperProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
