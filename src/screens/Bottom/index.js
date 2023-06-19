import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import Home from "./Home";
import Explore from "./Explore";
import Notification from "./Notification";
import Profile from "./Profile";
import UploadTweet from "./UploadTweet";

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#7d7d7d",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "gray",
          height: 50,
        },
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UploadTweetScreen"
        component={UploadTweet}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <FontAwesome name="plus-square" size={35} color={"#1D7ED8"} />
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={Notification}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell-o" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
