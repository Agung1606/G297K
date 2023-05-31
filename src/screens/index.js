import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

import Login from "./Login";
import Message from "./Message";
import VisitProfile from "./VisitProfile";
import DetailsTweet from "./DetailsTweet";

import Home from "./Home";
import Profile from "./Profile";

import { EmailRegisterScreen, PasswordRegisterScreen } from "../components";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavTab = () => (
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
        height: 60,
      },
    }}
    initialRouteName="HomeScreen"
  >
    <Tab.Screen
      name="HomeScreen"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileScreen"
      component={Profile}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome name="user-circle" size={30} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const RegisterStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="EmailRegisterScreen" component={EmailRegisterScreen} />
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

export {
  Login,
  BottomNavTab,
  DetailsTweet,
  VisitProfile,
  Message,
  RegisterStack,
};
