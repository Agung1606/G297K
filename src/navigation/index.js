import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import { Login, Register } from "../screens/Auth";
import BottomNavigation from "../screens/Bottom";
import {
  Message,
  UploadTweet,
  VisitProfile,
  DetailsTweet,
  TrendingList,
  SearchAccount,
  EditProfile
} from "../screens/App";

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
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfile}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default Routes
