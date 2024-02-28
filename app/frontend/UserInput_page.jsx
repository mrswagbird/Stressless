import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker} from '@react-native-picker/picker'

export default function UserInput() {
  const [heartRate, setHeartRate] = useState("");
  const [sleepDuration, setSleepDuration] = useState('');
  const [activity, setActivity] = useState(''); 

  const handleSubmit = () => {
    // Calculate a random stress level between 0 and 5 (as a placeholder)
    if (!heartRate || !sleepDuration || !activity) {
      Alert.alert('All fields must be filled before submitting.');
    } else {
    const stressLevel = Math.floor(Math.random() * 6);
    const currentTime = new Date().toLocaleTimeString();

    console.log(stressLevel);
    console.log("clicked");

    // Display stress level in an alert dialog
    Alert.alert(
      `Your stress level is: ${stressLevel}\nTime: ${currentTime}`
    );
    }
  };

  // const calculateStressLevel = (activity, sleepDuration, heartRate) => {
  //   // TODO: Implement your stress level calculation logic here
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Input</Text>
      <Text style={styles.description}>
        To assist our stress prediction model, please provide the following details. Please note that this input is for demonstration purposes only.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity:</Text>
        <Picker
          selectedValue={activity}
          onValueChange={(itemValue) => setActivity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Uni" value="Uni" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Hobby" value="Hobby" />
          <Picker.Item label="Social" value="Social" />
          <Picker.Item label="Other" value="Other" />
          <Picker.Item label="" value="" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sleep duration:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={sleepDuration}
          onChangeText={(text) => setSleepDuration(text)}
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
      <Button style={styles.submitButton} title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
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
    borderColor: 'gray',
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
  }
});
