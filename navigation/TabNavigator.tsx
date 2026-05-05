import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import FilesScreen from "../screens/FilesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Leagues from "../screens/Leagues";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",

        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : 10,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;
          /*
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Files") iconName = "folder";
          else if (route.name === "Profile") iconName = "person";
          */
          if (route.name === "Profile") iconName = "person";
          else if (route.name === "Files") iconName = "folder";
          else if (route.name === "Leagues") iconName = "football";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Files" component={FilesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Leagues" component={Leagues} />

    </Tab.Navigator>
  );
}