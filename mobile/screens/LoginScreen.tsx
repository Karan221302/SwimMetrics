import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      await AsyncStorage.setItem(
        "token",
        res.data.token
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Ionicons
            name="water"
            size={60}
            color="#2563EB"
          />
        </View>

        <Text style={styles.title}>
          SwimMetrics
        </Text>

        <Text style={styles.subtitle}>
          Athlete Performance Tracking
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>
          Email Address
        </Text>

        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>
          Password
        </Text>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#64748B"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.loginText}>
              Login
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        SwimMetrics © 2026
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },

  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    elevation: 6,
  },

  title: {
    marginTop: 20,
    fontSize: 34,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 8,
  },

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    elevation: 5,
  },

  label: {
    marginBottom: 8,
    color: "#334155",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#F8FAFC",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    borderRadius: 14,
    paddingHorizontal: 15,

    backgroundColor: "#F8FAFC",
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 15,
  },

  loginButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 25,
  },

  loginText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  footer: {
    textAlign: "center",
    marginTop: 25,
    color: "#94A3B8",
  },
});