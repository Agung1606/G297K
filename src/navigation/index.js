import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import { useSelector } from "react-redux";

import { Login, Register } from "../screens/Auth";
import BottomNavigation from "../screens/Bottom";
import {
  VisitProfile,
  DetailsPost,
  EditProfile,
} from "../screens/App";
import { SendComment, SearchAccount, Settings, Info } from "../screens/Modal";

const Routes = () => {
  const token = useSelector((state) => state.global.token);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!token ? (
        /* auth screens */
        <Stack.Group>
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="RegisterScreen" component={Register} />
        </Stack.Group>
      ) : (
        <>
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
              name="VisitProfileScreen"
              component={VisitProfile}
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="DetailsPostScreen"
              component={DetailsPost}
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfile}
              options={{
                animation: "slide_from_right",
              }}
            />
          </Stack.Group>
          {/* common modal screen */}
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="SendComment"
              component={SendComment}
              options={{
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen
              name="SearchAccountScreen"
              component={SearchAccount}
              options={{
                animation: "none",
              }}
            />
            <Stack.Screen
              name="SettingsScreen"
              component={Settings}
              options={{
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen
              name="InfoScreen"
              component={Info}
              options={{
                animation: "slide_from_right",
              }}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
