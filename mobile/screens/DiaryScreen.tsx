import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import API from "../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function DiaryScreen() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/logs/my");

      console.log("LOGS:", res.data);

      setLogs(res.data);
    } catch (err) {
      console.log("Diary Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (log: any) => {
    const dateValue =
      log?.date ||
      log?.createdAt ||
      log?.updatedAt;

    if (!dateValue) {
      return "No Date";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
      return "No Date";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          Workout Diary
        </Text>

        <Text style={styles.subtitle}>
          Track your completed sessions
        </Text>
      </View>

      {logs.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons
            name="book-outline"
            size={70}
            color="#CBD5E1"
          />

          <Text style={styles.emptyText}>
            No workout logs yet
          </Text>
        </View>
      ) : (
        logs.map((log: any) => (
          <View
            key={log._id}
            style={styles.card}
          >
            <View style={styles.cardTop}>
              <View>
                <Text
                  style={styles.workoutName}
                >
                  {log?.assignment?.workout
                    ?.name ||
                    "Workout Session"}
                </Text>

                <Text style={styles.date}>
                  {formatDate(log)}
                </Text>
              </View>

              <View
                style={
                  styles.completedBadge
                }
              >
                <Text
                  style={styles.badgeText}
                >
                  Completed
                </Text>
              </View>
            </View>

            <View
              style={styles.divider}
            />

            <View
              style={styles.statsRow}
            >
              <View style={styles.stat}>
                <Ionicons
                  name="timer-outline"
                  size={20}
                  color="#2563EB"
                />

                <Text
                  style={styles.statLabel}
                >
                  Session Logged
                </Text>
              </View>

              <View style={styles.stat}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#22C55E"
                />

                <Text
                  style={styles.statLabel}
                >
                  Saved
                </Text>
              </View>
            </View>

            {log?.notes && (
              <View
                style={styles.notesBox}
              >
                <Text
                  style={styles.notesTitle}
                >
                  Notes
                </Text>

                <Text
                  style={styles.notesText}
                >
                  {log.notes}
                </Text>
              </View>
            )}
          </View>
        ))
      )}
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
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 18,
    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  workoutName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  date: {
    marginTop: 5,
    color: "#64748B",
  },

  completedBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: "#15803D",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
  },

  statLabel: {
    marginLeft: 8,
    color: "#475569",
  },

  notesBox: {
    marginTop: 15,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
  },

  notesTitle: {
    fontWeight: "700",
    marginBottom: 5,
  },

  notesText: {
    color: "#475569",
  },

  empty: {
    alignItems: "center",
    marginTop: 120,
  },

  emptyText: {
    marginTop: 15,
    fontSize: 18,
    color: "#64748B",
  },
});

