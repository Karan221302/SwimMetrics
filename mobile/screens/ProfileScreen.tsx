import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import API from "../services/api";

export default function Profile({ navigation }: any) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const formatBestTime = (seconds: number) => {
    if (!seconds) return "--";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.round(
      (seconds - Math.floor(seconds)) * 100
    );

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 140,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={55}
            color="#2563EB"
          />
        </View>

        <Text style={styles.name}>
          {profile?.user?.name || "Swimmer"}
        </Text>

        <Text style={styles.email}>
          {profile?.user?.email || ""}
        </Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {profile?.user?.role || "swimmer"}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {profile?.workouts || 0}
          </Text>

          <Text style={styles.statLabel}>
            Workouts
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {(
              (profile?.distance || 0) / 1000
            ).toFixed(1)}
          </Text>

          <Text style={styles.statLabel}>
            KM Swim
          </Text>
        </View>

        <View style={styles.statCard}>
        <Text style={styles.statValue}>
  {profile?.performanceRecords || 0}
</Text>

<Text style={styles.statLabel}>
  Records
</Text>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem
          icon="person-outline"
          title="Personal Information"
          onPress={() => 
           navigation.navigate(
            "PersonalInformation"
           )
          }
        />

        <MenuItem
          icon="flag-outline"
          title="Goals"
          onPress={() =>
            navigation.navigate("Goals")
          }
        />

        <MenuItem
          icon="stats-chart-outline"
          title="Performance"
          onPress={() =>
            navigation.navigate(
              "Performance"
            )
          }
        />

        <MenuItem
          icon="settings-outline"
          title="Settings"
          onPress={() =>
            navigation.navigate("Settings")
          }
        />

        <MenuItem
          icon="help-circle-outline"
          title="Help & Support"
          onPress={() =>
            navigation.navigate(
              "HelpSupport"
            )
          }
        />
      </View>

      {/* Additional Stats */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Training Summary
        </Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Performance Records
          </Text>

          <Text style={styles.summaryValue}>
            {profile?.performanceRecords ||
              0}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Total Distance
          </Text>

          <Text style={styles.summaryValue}>
            {(
              (profile?.distance || 0) /
              1000
            ).toFixed(1)}
            km
          </Text>
        </View>

        <View style={styles.summaryRow}>
  <Text style={styles.summaryLabel}>
    Completed Workouts
  </Text>

  <Text style={styles.summaryValue}>
    {profile?.workouts || 0}
  </Text>
</View>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={logout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#EF4444"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={22}
          color="#475569"
        />

        <Text style={styles.menuText}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#94A3B8"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#2563EB",
    paddingTop: 70,
    paddingBottom: 45,
    alignItems: "center",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
  },

  email: {
    color: "#DBEAFE",
    marginTop: 5,
  },

  roleBadge: {
    backgroundColor: "#1D4ED8",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },

  roleText: {
    color: "#FFF",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -25,
    marginHorizontal: 15,
  },

  statCard: {
    backgroundColor: "#FFF",
    width: 110,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    elevation: 5,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  statLabel: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 12,
  },

  menu: {
    marginTop: 25,
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#0F172A",
  },

  summaryCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#0F172A",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  summaryLabel: {
    color: "#64748B",
  },

  summaryValue: {
    fontWeight: "700",
    color: "#0F172A",
  },

  logoutBtn: {
    margin: 20,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#EF4444",
    marginLeft: 8,
    fontWeight: "600",
  },
});