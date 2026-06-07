import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import API from "../services/api";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function HistoryScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/logs/my");
      console.log(res.data)
      setWorkouts(res.data);
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

  const calculateWorkoutDistance = (workout: any) => {
  
    const warmup =
      workout?.warmup?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.distance || 0),
        0
      ) || 0;
  
    const mainSet =
      workout?.mainSet?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.distance || 0),
        0
      ) || 0;
  
    const cooldown =
      workout?.cooldown?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.distance || 0),
        0
      ) || 0;
  
   
  
    return warmup + mainSet + cooldown;
  };
  
  const totalDistance = workouts.reduce(
    (sum, w: any) =>
      sum +
      calculateWorkoutDistance(
        w.assignment?.workoutId
      ),
    0
  );

  const safeData =
  workouts.length > 0
    ? workouts
        .slice(0, 6)
        .map((w: any) =>
          calculateWorkoutDistance(
            w.assignment?.workoutId
          )
        )
    : [0];

const chartData = {
  labels:
    safeData.length > 1
      ? safeData.map((_, i) => `W${i + 1}`)
      : ["W1"],

  datasets: [
    {
      data: safeData,
    },
  ],
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Performance Analytics</Text>

      <View style={styles.statsRow}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>
            {workouts.length}
          </Text>
          <Text style={styles.cardLabel}>
            Sessions
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>
            {totalDistance}
          </Text>
          <Text style={styles.cardLabel}>
            Meters
          </Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          Distance Trend
        </Text>

        <LineChart
          data={chartData}
          width={screenWidth - 60}
          height={220}
          yAxisSuffix="m"
          chartConfig={{
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 0,
            color: (opacity = 1) =>
              `rgba(37,99,235,${opacity})`,
            labelColor: (opacity = 1) =>
              `rgba(100,116,139,${opacity})`,
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      <Text style={styles.sectionTitle}>
        Workout History
      </Text>

      {workouts.map((item: any) => (
        <View key={item._id} style={styles.historyCard}>
          <View>
          <Text style={styles.stroke}>
  {item.assignment?.workoutId?.name ||
    "Workout"}
</Text>

<Text style={styles.distance}>
  {calculateWorkoutDistance(
    item.assignment?.workoutId
  )}m
</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Completed
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: 60,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 20,
    color: "#0F172A",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
  },

  cardNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2563EB",
  },

  cardLabel: {
    marginTop: 5,
    color: "#64748B",
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 18,
    padding: 15,
    elevation: 4,
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  historyCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  stroke: {
    fontSize: 18,
    fontWeight: "700",
  },

  distance: {
    color: "#64748B",
    marginTop: 4,
  },

  badge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#15803D",
    fontWeight: "600",
  },
});