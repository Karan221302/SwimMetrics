import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigator/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}