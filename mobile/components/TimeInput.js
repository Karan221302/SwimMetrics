import { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function TimeInput({ onChange }) {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;

    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }

    const formatted = `${newValues[0] || "_"}${newValues[1] || "_"}:${
      newValues[2] || "_"
    }${newValues[3] || "_"}:${newValues[4] || "_"}${
      newValues[5] || "_"
    }`;

    onChange(formatted);
  };

  return (
    <View style={styles.container}>
      {values.map((val, i) => (
        <View key={i} style={styles.boxContainer}>
          <TextInput
            ref={(ref) => (inputs.current[i] = ref)}
            value={val}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChange(text, i)}
            style={styles.box}
          />

          {(i === 1 || i === 3) && (
            <Text style={styles.colon}>:</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  box: {
    width: 35,
    height: 45,
    borderWidth: 1,
    textAlign: "center",
    marginHorizontal: 2,
    borderRadius: 6,
    fontSize: 18
  },
  colon: {
    fontSize: 18,
    marginHorizontal: 2
  }
});