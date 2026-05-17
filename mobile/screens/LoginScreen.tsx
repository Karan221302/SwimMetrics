import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import API from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";




  export default function Login({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async () => {
      try {
        const res = await API.post("/users/login", { email, password });
    
        await AsyncStorage.setItem("token", res.data.token);
    
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
    
      } catch (err) {
        console.log("Login error:", err);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwimMetrics</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  }
});