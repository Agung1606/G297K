import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import Home from "./Home";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
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
            <MaterialIcons name="home" size={35} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
