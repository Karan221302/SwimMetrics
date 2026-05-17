import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import API from "../services/api";

export default function AddTraining() {
  const [distance, setDistance] = useState("");
  const [stroke, setStroke] = useState("");

  const submit = async () => {
    await API.post("/training", { distance, stroke });
    alert("Saved");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Distance" onChangeText={setDistance} />
      <TextInput placeholder="Stroke" onChangeText={setStroke} />
      <Button title="Save" onPress={submit} />
    </View>
  );
}