import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import Login from "./Login";
import Register from "./Register";
import Message from "./Message";
import UploadTweet from "./UploadTweet";
import VisitProfile from "./VisitProfile";
import DetailsTweet from "./DetailsTweet";
import TrendingList from "./TrendingList";

import Home from "./Home";
import Explore from "./Explore";
import Nontification from "./Nontification";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const BottomNavTab = () => {
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
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NontificationScreen"
        component={Nontification}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell-o" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export {
  Login,
  Register,
  Message,
  UploadTweet,
  VisitProfile,
  DetailsTweet,
  TrendingList,
  BottomNavTab,
};
