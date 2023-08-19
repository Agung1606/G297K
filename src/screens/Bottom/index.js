import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import Home from "./Home";
import Explore from "./Explore";
import Notification from "./Notification";
import Profile from "./Profile";
import UploadPost from "./UploadPost";

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
              <Ionicons name="home-sharp" size={30} color={color} />
            ) : (
              <Ionicons name="home-outline" size={30} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={Explore}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="search-sharp" size={30} color={color} />
            ) : (
              <Ionicons name="search-outline" size={30} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="UploadPostScreen"
        component={UploadPost}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={35} color={color} />
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
              <Ionicons name="heart-sharp" size={30} color={color} />
            ) : (
              <Ionicons name="heart-outline" size={30} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="person-sharp" size={30} color={color} />
            ) : (
              <Ionicons name="person-outline" size={30} color={color} />
            ),
        }}
      />
      {/* <Tab.Screen
       name="AddedDummyDataScreen"
        component={AddedDummyData}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={35} color={color} />
          ),
        }}
      />  */}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
