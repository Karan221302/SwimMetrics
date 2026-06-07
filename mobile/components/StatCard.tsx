import {
    View,
    Text,
    StyleSheet,
  } from "react-native";
  
  export default function StatCard({
    value,
    label,
  }: any) {
    return (
      <View style={styles.card}>
        <Text style={styles.value}>
          {value}
        </Text>
  
        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#FFF",
      width: "48%",
      borderRadius: 18,
      padding: 20,
      alignItems: "center",
      elevation: 4,
    },
  
    value: {
      fontSize: 24,
      fontWeight: "700",
      color: "#2563EB",
    },
  
    label: {
      color: "#64748B",
      marginTop: 5,
    },
  });