import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

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
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Suggestions"
          onPress={() => navigation.navigate("Suggestions")}
          style={styles.button}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Stress Report"
          onPress={() => navigation.navigate("Report")}
          style={styles.button}
        />
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Notification Test"
          onPress={() => navigation.navigate("Notification")}
          style={styles.button}
        /> 
      </View> */}
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
  buttonContainer: {
    width:'85%',
    marginBottom: 15, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 2,
  },
  button: {
    marginTop: 10,
  },
});
