import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import * as tf from "@tensorflow/tfjs";
// import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

export default function UserInput({ navigation }) {
  const [heartRate, setHeartRate] = useState("");
  const [sleepDuration, setSleepDuration] = useState("");
  const [activity, setActivity] = useState("");
  const [model, setModel] = useState(false);

  const [tfReady, setTfReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await tf.ready();
      const modelJson = require("../model/model.json");
      const modelWeights = require("../model/group1-shard1of1.bin");

      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJson, [modelWeights])
      );
      setTfReady(true);
      setModel(model);
      console.warn("TF now ready!");
    }
    prepare();
  }, []);

  const predict = () => {
    return 3;
  };

  const handleSubmit = () => {
    // Calculate a random stress level between 0 and 5 (as a placeholder)
    if (!heartRate || !sleepDuration || !activity) {
      Alert.alert("All fields must be filled before submitting.");
    } else {
      const stresslevel = predict();

      if (stresslevel >= 2) {
        Alert.alert(
          "Confirmation",
          `Your stress level is  ${stresslevel}, you need some relaxation`,

          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Suggestions");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          `You are doing good, you stress level is only ${stresslevel}`
        );
      }
    }
  };

  // const calculateStressLevel = (activity, sleepDuration, heartRate) => {
  //   // TODO: Implement your stress level calculation logic here
  // };

  const activityOptions = ["Uni", "Work", "Hobby", "Social", "Other"];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.description}>
          To assist our stress prediction model, please provide the following
          details. Please note that this input is for demonstration purposes
          only.
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Activity:</Text>
          <SelectDropdown
          style={styles.picker}
            data={activityOptions}
            onSelect={(selectedItem) => setActivity(selectedItem)}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sleep duration:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={sleepDuration}
            onChangeText={(text) => setSleepDuration(text)}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Heart Rate:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={heartRate}
            onChangeText={(text) => setHeartRate(text)}
          />
        </View>

        <Button
          style={styles.submitButton}
          title="Submit"
          onPress={handleSubmit}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },

  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginVertical: 8,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    width: 200,
    borderRadius: 10,
    borderColor: "",
    backgroundColor: "bababa",
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 2,
  },
  picker: {
    height: 40,
    width: 200,
    borderRadius: 10,
  },
  submitButton: {
    width: 200,
    borderRadius: 10,
  },
});
