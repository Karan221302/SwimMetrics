import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Login from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import LogScreen from "@/screens/LogScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

useFocusEffect(
  useCallback(() => {
    checkAuth();
  }, [])
);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
        <Stack.Screen name="Main" component={TabNavigator}/>
        <Stack.Screen name="Log" component={LogScreen}/>
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}