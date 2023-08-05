import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import Home from "./Home";
import Explore from "./Explore";
import Notification from "./Notification";
import Profile from "./Profile";
import UploadTweet from "./UploadTweet";

import AddedDummyData from "./AddedDummyData";

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
          borderTopColor: "white",
          height: 50,
        },
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="home-sharp" size={28} color={color} />
            ) : (
              <Ionicons name="home-outline" size={28} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={Explore}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="search-sharp" size={28} color={color} />
            ) : (
              <Ionicons name="search-outline" size={28} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="UploadTweetScreen"
        component={UploadTweet}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Ionicons name="md-add-circle" size={35} color={"#1D7ED8"} />
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
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="heart-sharp" size={28} color={color} />
            ) : (
              <Ionicons name="heart-outline" size={28} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="person-sharp" size={28} color={color} />
            ) : (
              <Ionicons name="person-outline" size={28} color={color} />
            ),
        }}
      />
      {/* <Tab.Screen
       name="AddedDummyDataScreen"
        component={AddedDummyData}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="address-book-o" size={28} color={color} />
          ),
        }}
      />  */}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
