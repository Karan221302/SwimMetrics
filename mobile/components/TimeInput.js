import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

export default function TimeInput({ onChange }) {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [milliseconds, setMilliseconds] =
    useState("");

  const updateTime = (min, sec, ms) => {
    const formatted = `${min || "00"}:${
      sec || "00"
    }:${ms || "00"}`;

    onChange(formatted);
  };

  const handleMinutes = (text) => {
    if (!/^\d*$/.test(text)) return;

    const value = Number(text);

    if (text !== "" && value > 59) {
      return;
    }

    setMinutes(text);
    updateTime(text, seconds, milliseconds);
  };

  const handleSeconds = (text) => {
    if (!/^\d*$/.test(text)) return;

    const value = Number(text);

    if (text !== "" && value > 99) {
      return;
    }

    setSeconds(text);
    updateTime(minutes, text, milliseconds);
  };

  const handleMilliseconds = (text) => {
    if (!/^\d*$/.test(text)) return;

    const value = Number(text);

    if (text !== "" && value > 99) {
      return;
    }

    setMilliseconds(text);
    updateTime(minutes, seconds, text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="MM"
        maxLength={2}
        value={minutes}
        onChangeText={handleMinutes}
      />

      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="SS"
        maxLength={2}
        value={seconds}
        onChangeText={handleSeconds}
      />

      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="MS"
        maxLength={2}
        value={milliseconds}
        onChangeText={handleMilliseconds}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    textAlign: "center",
    backgroundColor: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },

  separator: {
    width: 10,
  },
});