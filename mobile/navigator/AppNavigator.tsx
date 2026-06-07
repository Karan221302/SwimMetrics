import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

import Login from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import LogScreen from "../screens/LogScreen";
import PersonalInformationScreen from "../screens/PersonalInformationScreen";
import GoalsScreen from "../screens/GoalsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] =
    useState("Login");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token =
        await AsyncStorage.getItem("token");

      if (token) {
        setInitialRoute("Main");
      } else {
        setInitialRoute("Login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
      />

      <Stack.Screen
        name="Main"
        component={TabNavigator}
      />

      <Stack.Screen
        name="Log"
        component={LogScreen}
      />
      <Stack.Screen 
        name="PersonalInformation"
        component={PersonalInformationScreen}
      />
      <Stack.Screen 
        name="Goals"
        component={GoalsScreen}
      />
      <Stack.Screen 
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen 
      name="HelpSupport"
      component={HelpSupportScreen}
    />
    </Stack.Navigator>
  );
}