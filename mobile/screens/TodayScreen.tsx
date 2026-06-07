import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import API from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function TodayScreen({ navigation }: any) {
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchToday();
    }, [])
  );

  const fetchToday = async () => {
    try {
      const res = await API.get("/assign/my");

      const today = new Date().toISOString().split("T")[0];

      const todaysWorkout = res.data.find((w: any) => {
        const assignmentDate = new Date(w.date)
          .toISOString()
          .split("T")[0];

        return assignmentDate === today;
      });

      setWorkout(todaysWorkout);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!workout || !workout.workoutId) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>🏊 No Workout Today</Text>
        <Text style={styles.emptyText}>
          Enjoy recovery time or wait for your coach to assign a workout.
        </Text>
      </View>
    );
  }

  const w = workout.workoutId;

  const totalDistance =
    [...(w.warmup || []), ...(w.mainSet || []), ...(w.cooldown || [])]
      .reduce((sum: number, item: any) => sum + (item.distance || 0), 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning 👋</Text>
        <Text style={styles.title}>Today's Workout</Text>
      </View>

      <View style={styles.workoutCard}>
        <Text style={styles.workoutName}>{w.name}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {w.level || "Intermediate"}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statValue}>{totalDistance}m</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>

          
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Log", {
              assignment: workout,
            })
          }
        >
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Workout Details</Text>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Warmup</Text>

        {w.warmup?.map((item: any, index: number) => (
          <Text key={index} style={styles.item}>
            • {item.description} ({item.distance}m)
          </Text>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Main Set</Text>

        {w.mainSet?.map((item: any, index: number) => (
          <Text key={index} style={styles.item}>
            • {item.description} ({item.distance}m)
          </Text>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Cooldown</Text>

        {w.cooldown?.map((item: any, index: number) => (
          <Text key={index} style={styles.item}>
            • {item.description} ({item.distance}m)
          </Text>
        ))}
      </View>
    </ScrollView>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#2563EB",
  },

  greeting: {
    color: "#E0E7FF",
    fontSize: 16,
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },

  workoutCard: {
    backgroundColor: "#FFF",
    margin: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  workoutName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
  },

  badge: {
    backgroundColor: "#DCFCE7",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },

  badgeText: {
    color: "#15803D",
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#64748B",
  },

  button: {
    backgroundColor: "#2563EB",
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  sectionCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
  },

  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },

  item: {
    marginBottom: 8,
    color: "#334155",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    color: "#64748B",
  },
});