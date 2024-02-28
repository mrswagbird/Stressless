import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./frontend/Landing_page";
import UserInput from "./frontend/UserInput_page";
import Suggestions from "./frontend/Suggestions_page";
import Report from "./frontend/Report_page";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import loadCSV from "./model/model";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={LandingPage} />
          <Stack.Screen name="UserInput" component={UserInput} />
          <Stack.Screen name="Suggestions" component={Suggestions} />
          <Stack.Screen name="Report" component={Report} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});
