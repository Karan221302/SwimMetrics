import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import API from "../services/api";

export default function History() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get("/training").then(res => setLogs(res.data));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {logs.map((l: any) => (
        <Text key={l._id}>{l.stroke} - {l.distance}</Text>
      ))}
    </View>
  );
}