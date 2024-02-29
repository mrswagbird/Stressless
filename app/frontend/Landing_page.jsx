import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to StressLess</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="User Input"
          onPress={() => navigation.navigate("UserInput")}
          style={styles.button}
        />
        <Button
          title="Suggestions"
          onPress={() => navigation.navigate("Suggestions")}
          style={styles.button}
        />
        <Button
          title="Stress Report"
          onPress={() => navigation.navigate("Report")}
          style={styles.button}
        />
        <Button
          title="Notification Test"
          onPress={() => navigation.navigate("Notification")}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
  },
  buttonContainer: {},
  button: {
    marginTop: 10,
  },
});
