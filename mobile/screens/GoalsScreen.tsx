import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GoalsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <Text style={styles.title}>
        Goals
      </Text>

      <View style={styles.goalCard}>
        <Ionicons
          name="flag"
          size={40}
          color="#2563EB"
        />

        <Text style={styles.goalTitle}>
          Monthly Distance Goal
        </Text>

        <Text style={styles.goalValue}>
          2.3 / 10 km
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: "23%" },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          23% Completed
        </Text>
      </View>

      <View style={styles.goalCard}>
        <Ionicons
          name="trophy"
          size={40}
          color="#F59E0B"
        />

        <Text style={styles.goalTitle}>
          Workout Goal
        </Text>

        <Text style={styles.goalValue}>
          1 / 20 Sessions
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: "5%" },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          5% Completed
        </Text>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>
          Coach Tip
        </Text>

        <Text style={styles.tipText}>
          Consistency beats intensity.
          Focus on completing workouts
          regularly and the results will
          follow.
        </Text>
      </View>
    </ScrollView>
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
    marginBottom: 20,
    color: "#0F172A",
  },

  goalCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    color: "#0F172A",
  },

  goalValue: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    color: "#2563EB",
  },

  progressBar: {
    width: "100%",
    height: 12,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    marginTop: 15,
  },

  progressFill: {
    height: 12,
    backgroundColor: "#2563EB",
    borderRadius: 10,
  },

  progressText: {
    marginTop: 10,
    color: "#64748B",
  },

  tipCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
  },

  tipTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  tipText: {
    color: "#64748B",
    lineHeight: 22,
  },
});