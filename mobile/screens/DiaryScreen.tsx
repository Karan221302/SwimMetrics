import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import API from "../services/api";

export default function DiaryScreen() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await API.get("/logs/my");
    setLogs(res.data);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Workout Diary</Text>

      {logs.map((l: any) => (
        <View key={l._id}>
          <Text>{l.date}</Text>
          <Text>{l.assignment?.workout?.name}</Text>
        </View>
      ))}
    </View>
  );
}