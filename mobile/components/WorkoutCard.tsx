import {
    View,
    Text,
    StyleSheet,
  } from "react-native";
  
  export default function WorkoutCard({
    title,
    category,
    level,
    distance,
  }: any) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>
          {title}
        </Text>
  
        <Text style={styles.meta}>
          {category} • {level}
        </Text>
  
        <Text style={styles.distance}>
          {distance}m
        </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#FFF",
      borderRadius: 18,
      padding: 18,
      marginBottom: 15,
  
      elevation: 4,
    },
  
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: "#0F172A",
    },
  
    meta: {
      marginTop: 5,
      color: "#64748B",
    },
  
    distance: {
      marginTop: 15,
      fontWeight: "700",
      color: "#2563EB",
      fontSize: 18,
    },
  });