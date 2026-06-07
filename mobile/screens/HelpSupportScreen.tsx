import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

export default function HelpSupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Help & Support
      </Text>

      <View style={styles.card}>
        <Text>Email:</Text>
        <Text>
          support@swimmetrics.com
        </Text>
      </View>

      <View style={styles.card}>
        <Text>
          App Version 1.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F8FAFC",
    padding:20
  },
  title:{
    fontSize:28,
    fontWeight:"700",
    marginBottom:20
  },
  card:{
    backgroundColor:"#FFF",
    padding:20,
    borderRadius:16,
    marginBottom:15
  }
});