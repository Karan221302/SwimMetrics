import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";
import API from "../services/api";
import TimeInput from "../components/TimeInput";

export default function LogScreen({ route }: any) {
  const { assignment } = route.params;

  const [times, setTimes] = useState<any>({});
  const [feedback, setFeedback] = useState("");

  const submit = async () => {
    try {
      const payload = {
        assignmentId: assignment._id,
        mainSetLogs: Object.keys(times).map((k) => ({
          setIndex: Number(k),
          reps: times[k]
        })),
        notes: feedback
      };

      console.log("PAYLOAD:", payload);

      await API.post("/logs", payload);

      alert("Saved ");

    } catch (err) {
      console.log(err);
      alert("Error saving log");
    }
  };

  if (!assignment?.workoutId) {
    return <Text>No workout data</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Times</Text>

      {assignment.workoutId.mainSet.map((set: any, i: number) => {
        const reps =
          parseInt(set.description.split("x")[0]) || 1;

        return (
          <View key={i} style={styles.setContainer}>
            <Text style={styles.setTitle}>{set.description}</Text>

            {[...Array(reps)].map((_, repIndex) => (
              <View key={repIndex} style={styles.row}>
                <Text style={styles.rep}>{repIndex + 1}.</Text>

                <TimeInput
                  onChange={(formatted: any) => {
                    const updated = { ...times };

                    if (!updated[i]) updated[i] = [];

                    updated[i][repIndex] = formatted;

                    setTimes(updated);
                  }}
                />
              </View>
            ))}
          </View>
        );
      })}

      { }
      <Text style={styles.section}>Feedback</Text>

      <TextInput
        placeholder="How was the workout?"
        value={feedback}
        onChangeText={setFeedback}
        multiline
        style={styles.feedback}
      />

      <Button title="Submit" onPress={submit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },

  setContainer: { marginBottom: 20 },

  setTitle: {
    fontWeight: "600",
    marginBottom: 10
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  rep: { width: 25, fontSize: 16 },

  section: {
    marginTop: 20,
    fontWeight: "600"
  },

  feedback: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    height: 80,
    marginTop: 10,
    marginBottom: 20
  }
});