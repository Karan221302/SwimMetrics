import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }: any) {
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("LoginScreen");
  };

  return (
    <View style={{ padding: 90 }}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}