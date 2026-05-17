import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView
} from "react-native";
import API from "../services/api";

export default function TodayScreen({ navigation }: any) {
  const [workout, setWorkout] = useState<any>(null);

  useEffect(() => {
    fetchToday();
  }, []);

  const fetchToday = async () => {
    try {
      const res = await API.get("/assign/my");

      const today = new Date().toISOString().split("T")[0];

      const todaysWorkout = res.data.find(
        (w: any) => w.date === today
      );

      console.log("TODAY:", todaysWorkout);

      setWorkout(todaysWorkout);
    } catch (err) {
      console.log(err);
    }
  };

  if (!workout || !workout.workoutId) {
    return (
      <View style={styles.center}>
        <Text>No workout today</Text>
      </View>
    );
  }

  const w = workout.workoutId;

  return (
    <ScrollView style={styles.container}>
      {}
      <Text style={styles.title}>{w.name}</Text>
      <Text style={styles.meta}>Category: {w.category}</Text>
      <Text style={styles.meta}>Level: {w.level}</Text>

      {}
      <Text style={styles.section}>Warmup</Text>
      {w.warmup?.map((item: any, i: number) => (
        <Text key={i} style={styles.item}>
          • {item.description} ({item.distance}m)
        </Text>
      ))}

      {}
      <Text style={styles.section}>Main Set</Text>
      {w.mainSet?.map((item: any, i: number) => (
        <Text key={i} style={styles.item}>
          • {item.description} ({item.distance}m)
        </Text>
      ))}

      {}
      <Text style={styles.section}>Cooldown</Text>
      {w.cooldown?.map((item: any, i: number) => (
        <Text key={i} style={styles.item}>
          • {item.description} ({item.distance}m)
        </Text>
      ))}

      {}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Start Logging"
          onPress={() =>
            navigation.navigate("Log", { assignment: workout })
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5
  },
  meta: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5
  },
  section: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600"
  },
  item: {
    marginLeft: 10,
    marginTop: 5
  }
});