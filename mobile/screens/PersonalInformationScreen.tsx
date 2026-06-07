import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import API from "../services/api";

export default function PersonalInformationScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        paddingBottom: 40,
      }}
    >
      <Text style={styles.title}>
        Personal Information
      </Text>

      <View style={styles.card}>
        <InfoRow
          icon="person-outline"
          label="Full Name"
          value={profile?.user?.name || "-"}
        />

        <InfoRow
          icon="mail-outline"
          label="Email"
          value={profile?.user?.email || "-"}
        />

        <InfoRow
          icon="people-outline"
          label="Role"
          value={profile?.user?.role || "-"}
        />
      </View>

      <Text style={styles.section}>
        Swimming Statistics
      </Text>

      <View style={styles.card}>
        <InfoRow
          icon="fitness-outline"
          label="Completed Workouts"
          value={`${profile?.workouts || 0}`}
        />

        <InfoRow
          icon="speedometer-outline"
          label="Distance Swum"
          value={`${(
            (profile?.distance || 0) / 1000
          ).toFixed(1)} km`}
        />

        <InfoRow
          icon="stats-chart-outline"
          label="Performance Records"
          value={`${profile?.performanceRecords || 0}`}
        />
      </View>
    </ScrollView>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: any) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={22}
          color="#2563EB"
        />
        <Text style={styles.label}>
          {label}
        </Text>
      </View>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    color: "#0F172A",
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 10,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginLeft: 10,
    color: "#334155",
  },

  value: {
    fontWeight: "600",
    color: "#0F172A",
  },
});