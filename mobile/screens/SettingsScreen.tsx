import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({
  navigation,
}: any) {
  const comingSoon = () => {
    Alert.alert(
      "Coming Soon",
      "This feature will be available in a future update."
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <Text style={styles.title}>
        Settings
      </Text>

      {/* Account */}
      <Text style={styles.sectionTitle}>
        Account
      </Text>

      <View style={styles.card}>
        <SettingItem
          icon="person-outline"
          title="Edit Profile"
          onPress={() =>
            navigation.navigate(
              "PersonalInformation"
            )
          }
        />

        <SettingItem
          icon="lock-closed-outline"
          title="Change Password"
          onPress={comingSoon}
        />
      </View>

      {/* Preferences */}
      <Text style={styles.sectionTitle}>
        Preferences
      </Text>

      <View style={styles.card}>
        <SettingItem
          icon="notifications-outline"
          title="Notifications"
          onPress={comingSoon}
        />

        <SettingItem
          icon="color-palette-outline"
          title="Theme"
          onPress={comingSoon}
        />
      </View>

      {/* Training */}
      <Text style={styles.sectionTitle}>
        Training
      </Text>

      <View style={styles.card}>
        <SettingItem
          icon="stats-chart-outline"
          title="Performance Analytics"
          onPress={() =>
            navigation.navigate("Main",{
              screen: "Performance",}
            )
          }
        />

        <SettingItem
          icon="flag-outline"
          title="Goals"
          onPress={() =>
            navigation.navigate("Goals")
          }
        />
      </View>

      {/* About */}
      <Text style={styles.sectionTitle}>
        About
      </Text>

      <View style={styles.card}>
        <SettingItem
          icon="help-circle-outline"
          title="Help & Support"
          onPress={() =>
            navigation.navigate(
              "HelpSupport"
            )
          }
        />

        <SettingItem
          icon="information-circle-outline"
          title="App Version"
          rightText="1.0.0"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}

function SettingItem({
  icon,
  title,
  onPress,
  rightText,
}: any) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
    >
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={22}
          color="#475569"
        />

        <Text style={styles.itemText}>
          {title}
        </Text>
      </View>

      {rightText ? (
        <Text style={styles.rightText}>
          {rightText}
        </Text>
      ) : (
        <Ionicons
          name="chevron-forward"
          size={18}
          color="#94A3B8"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 10,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#0F172A",
  },

  rightText: {
    color: "#64748B",
    fontWeight: "600",
  },
});