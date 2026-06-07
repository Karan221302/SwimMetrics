import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import API from "../services/api";
import TimeInput from "../components/TimeInput";
import { Picker } from "@react-native-picker/picker";

export default function LogScreen({ route, navigation }: any) {
  const { assignment } = route.params;

  const [times, setTimes] = useState<any>({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [stroke, setStroke] =
  useState("Freestyle");

const [distance, setDistance] =
  useState(100);

const [performanceTime, setPerformanceTime] =
  useState("");

  const submit = async () => {
    try {
      setLoading(true);

      const payload = {
        assignmentId: assignment._id,
      
        mainSetLogs: Object.keys(times).map(
          (k) => ({
            setIndex: Number(k),
            reps: times[k],
          })
        ),
      
        notes: feedback,
      
        performance: {
          stroke,
          distance,
          time: performanceTime,
        },
      };

      console.log(
        "PAYLOAD:",
        JSON.stringify(payload, null, 2)
      );

      await API.post("/logs", payload);

      Alert.alert(
        "Workout Saved",
        "Your performance has been recorded.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (err: any) {
      console.log(err?.response?.data);

      Alert.alert(
        "Error",
        err?.response?.data?.message ||
          "Unable to save workout."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!assignment?.workoutId) {
    return (
      <View style={styles.center}>
        <Text>No workout data found</Text>
      </View>
    );
  }

  const workout = assignment.workoutId;
  const distanceOptions: Record<string, number[]> = {
    Freestyle: [50, 100, 200, 400, 800, 1500],
  
    Backstroke: [50, 100, 200],
  
    Breaststroke: [50, 100, 200],
  
    Butterfly: [50, 100, 200],
  
    IM: [200, 400],
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerCard}>
        <Text style={styles.workoutName}>
          {workout.name}
        </Text>

        <Text style={styles.workoutMeta}>
          {workout.category} • {workout.level}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Main Set Times
      </Text>
      <Text style={styles.sectionTitle}>
  Performance Entry
</Text>

<View style={styles.setCard}>
  <Text style={styles.repLabel}>
    Stroke
  </Text>

  <Picker
    selectedValue={stroke}
    onValueChange={(value) => {
      setStroke(value);

      setDistance(
        distanceOptions[value][0]
      );
    }}
  >
    <Picker.Item
      label="Freestyle"
      value="Freestyle"
    />

    <Picker.Item
      label="Backstroke"
      value="Backstroke"
    />

    <Picker.Item
      label="Breaststroke"
      value="Breaststroke"
    />

    <Picker.Item
      label="Butterfly"
      value="Butterfly"
    />

    <Picker.Item
      label="IM"
      value="IM"
    />
  </Picker>

  <Text style={styles.repLabel}>
    Distance
  </Text>

  <Picker
    selectedValue={distance}
    onValueChange={setDistance}
  >
    {distanceOptions[stroke].map(
      (d) => (
        <Picker.Item
          key={d}
          label={`${d}m`}
          value={d}
        />
      )
    )}
  </Picker>

  <Text style={styles.repLabel}>
    Official Time
  </Text>

  <TimeInput
    onChange={(value:string) =>
      setPerformanceTime(value)
    }
  />
</View>
      {workout.mainSet?.map(
        (set: any, index: number) => {
          const reps =
            parseInt(
              set.description.split("x")[0]
            ) || 1;

          return (
            <View
              key={index}
              style={styles.setCard}
            >
              <Text style={styles.setTitle}>
                {set.description}
              </Text>

              {[...Array(reps)].map(
                (_, repIndex) => (
                  <View
                    key={repIndex}
                    style={styles.repRow}
                  >
                    <Text
                      style={styles.repLabel}
                    >
                      Rep {repIndex + 1}
                    </Text>

                    <TimeInput
                      onChange={(
                        formatted: string
                      ) => {
                        const updated = {
                          ...times,
                        };

                        if (
                          !updated[index]
                        ) {
                          updated[index] =
                            [];
                        }

                        updated[index][
                          repIndex
                        ] = formatted;

                        setTimes(updated);
                      }}
                    />
                  </View>
                )
              )}
            </View>
          );
        }
      )}

      <Text style={styles.sectionTitle}>
        Workout Feedback
      </Text>

      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        placeholder="How did today's workout feel?"
        multiline
        style={styles.feedbackBox}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          loading && {
            opacity: 0.7,
          },
        ]}
        onPress={submit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text
            style={styles.submitButtonText}
          >
            Submit Workout
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerCard: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
  },

  workoutName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },

  workoutMeta: {
    color: "#DBEAFE",
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 15,
  },

  setCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  setTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 15,
    color: "#0F172A",
  },

  repRow: {
    marginBottom: 12,
  },

  repLabel: {
    marginBottom: 8,
    color: "#475569",
    fontWeight: "600",
  },

  feedbackBox: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    minHeight: 120,
    padding: 15,
    textAlignVertical: "top",
    marginBottom: 25,
    elevation: 2,
  },

  submitButton: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },

  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});