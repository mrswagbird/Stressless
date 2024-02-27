import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import Landing_page from "./frontend/Landing_page";
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
      <Landing_page />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen name="LandingPage" component={Landing_page} />
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
