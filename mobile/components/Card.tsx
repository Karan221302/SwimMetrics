import { View, Text, StyleSheet } from "react-native";

export default function Card({ title, value }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    margin: 10,
    alignItems: "center",
    elevation: 3
  },
  title: {
    fontSize: 16,
    color: "#555"
  },
  value: {
    fontSize: 28,
    fontWeight: "bold"
  }
});