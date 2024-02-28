import { View, Text, StyleSheet } from 'react-native';

export default function Suggestions() {
    return (
        <View style={styles.container}>
        <Text style={styles.heading}>Welcome to the Suggestions Page</Text>
        <Text>
            This is the suggestions page for the app. It will contain a brief
            description of the app and a button to start the app.
        </Text>
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
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
  });