import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { Link } from 'expo-router';
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to School Sys</Text>
      <Text style={styles.subtitle}>Your all-in-one school management system</Text>
      <TouchableOpacity onPress={() => router.push("/signin")} style={styles.getStartedButton}>
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  getStartedText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
