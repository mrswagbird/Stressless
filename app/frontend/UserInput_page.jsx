import React, {useEffect, useState} from 'react';
import {Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import * as tf from "@tensorflow/tfjs"
import {bundleResourceIO} from "@tensorflow/tfjs-react-native";
import * as sk from 'scikitjs';
import * as preprocessing from "scikitjs";



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
  }, [])

  const predict = () => {
    sk.setBackend(tf)
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const inputScaler = [[currentHour, parseFloat(heartRate), parseFloat(sleepDuration)]];
    //const inputScaler = [[10, 76.5, 8.0]];
    console.log(inputScaler);

    const StandardScaler = preprocessing.StandardScaler;
    const scaler = new StandardScaler();
    scaler.mean = [14.55020289, 105.930505, 7.42024268];
    scaler.scale = [3.85559805, 30.29517411, 1.16461952];

    const scaled = scaler.fitTransform(inputScaler);
    const syncScaler = scaled.arraySync();

    /*['activity_Chill' 'activity_Hobby' 'activity_Social' 'activity_Uni' 'activity_Work']*/

    let cat = [];
    switch (activity) {
      case 'Uni':
        cat = [0, 0, 0, 1, 0];
        break;
      case 'Work':
        cat = [0, 0, 0, 0, 1];
        break;
      case 'Hobby':
        cat = [0, 1, 0, 0, 0];
        break;
      case 'Social':
        cat = [0, 0, 1, 0, 0];
        break;
      case 'Other':
        cat = [1, 0, 0, 0, 0];
        break;
    }


    // Combine scaled numerical features and one-hot encoded categorical features
    const processed = syncScaler.map(row => row.concat(cat));
    const preprocessedInput = tf.tensor2d(processed);


    const result = model.predict(preprocessedInput);
    const predictedLabels = result.argMax(1).dataSync();

    return predictedLabels;
  }



  const handleSubmit = () => {
    if (!heartRate || !sleepDuration || !activity) {
      Alert.alert("All fields must be filled before submitting.");
    } else {
      const stresslevel = predict();
      console.log(stresslevel);
      if (stresslevel >= 2) {
        Alert.alert(
          "Confirmation",
          `Your stress level is ${stresslevel}, you need some relaxation`,

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
  },
  picker: {
    height: 40,
    width: 200,
  },
  submitButton: {
    // To Do
  },
});
