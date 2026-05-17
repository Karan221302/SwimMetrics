import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Today from "../screens/TodayScreen";
import Diary from "../screens/DiaryScreen";
import Profile from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarIcon: ({ color, size }) => {
          let icon: any = "home";

          if (route.name === "Today") icon = "today";
          else if (route.name === "Diary") icon = "book";
          else if (route.name ==="Log") icon="log";
          else if (route.name === "Profile") icon = "person";

          return <Ionicons name={icon} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Today" component={Today} />
      <Tab.Screen name="Diary" component={Diary} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}