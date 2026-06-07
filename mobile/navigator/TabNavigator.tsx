import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Today from "../screens/TodayScreen";
import Diary from "../screens/DiaryScreen";
import History from "../screens/HistoryScreen";
import Profile from "../screens/ProfileScreen";
import PerformanceScreen from "../screens/PerformanceScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({


        headerShown: false,

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarStyle: {
          position: "absolute",

          // Use only part of the inset
          bottom: insets.bottom > 0 ? 8 : 15,

          left: 15,
          right: 15,

          height: 60 + (insets.bottom * 0.7),
          paddingBottom: 5,
          paddingTop: 5,

          borderRadius: 20,
          backgroundColor: "#FFF",
          borderTopWidth: 0,

          elevation: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.08,
          shadowRadius: 20,

        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 5,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;

          switch (route.name) {
            case "Today":
              iconName = focused ? "home" : "home-outline";
              break;

            case "Diary":
              iconName = focused ? "book" : "book-outline";
              break;

            case "Performance":
               iconName = focused? "analytics": "analytics-outline";
               break;

            case "History":
              iconName = focused ? "bar-chart" : "bar-chart-outline";
              break;

            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;

            default:
              iconName = "ellipse";
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Today" component={Today} />
      <Tab.Screen name="Diary" component={Diary} />
      <Tab.Screen name="Performance" component={PerformanceScreen} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}