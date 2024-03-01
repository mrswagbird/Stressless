import React from "react";
import { View, Text, Button, StyleSheet, Image, ImageBackground } from "react-native";

const backgroundImage = require("../assets/Background3.jpg");

export default function LandingPage({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    <View style={styles.headingcontainer}>
      <Text style={styles.heading}>Welcome to StressLess</Text>
    </View>
    <View style={styles.container}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headingcontainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom:16,
    paddingLeft:16,
    paddingRight:16,
  },
  container: {
    flex: 1,
    justifyContent: "flext-start",
    alignItems: "center",
    paddingBottom: 250,
    paddingTop: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
  },
  heading: {
    fontSize: 28,
    color: "#242124",
    fontWeight: "bold",
    marginBottom: 10,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 2,
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
