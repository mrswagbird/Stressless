import { View, Text, StyleSheet } from "react-native";
import { Linking, Button } from "react-native";
import * as Contacts from "expo-contacts";

export default function Suggestions() {
  const openYoutubeMusic = () => {
    console.log("youtube");
    Linking.openURL("https://www.youtube.com/watch?v=S4hLxf02Ong").catch(
      (err) => {
        console.error(
          "Failed to open YouTube app. Opening in browser instead.",
          err
        );
        // Fallback to opening in the browser
        Linking.openURL("https://www.youtube.com/watch?v=S4hLxf02Ong");
      }
    );
  };

  const openYoutubeYoga = () => {
    console.log("youtube");
    Linking.openURL("https://www.youtube.com/watch?v=0tjssNmUEH4").catch(
      (err) => {
        console.error(
          "Failed to open YouTube app. Opening in browser instead.",
          err
        );
        // Fallback to opening in the browser
        Linking.openURL("https://www.youtube.com/watch?v=0tjssNmUEH4");
      }
    );
  };


  const open9gag = () => {
    console.log("9gag");
    Linking.openURL("https://9gag.com/");
  };

  const getRandomElement = (arr) => {
    // Generate a random index within the array length
    const randomIndex = Math.floor(Math.random() * arr.length);

    // Return the element at the random index
    return arr[randomIndex];
  };

  const callContact = async () => {
    // Ask for permission to access contacts
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      // Retrieve the user's contacts
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const contact = getRandomElement(data);
        console.log(data);

        if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
          // Get the first phone number of the contact
          const phoneNumber = contact.phoneNumbers[0].number;

          // Construct the tel: URL
          const dialerUrl = `tel:${phoneNumber}`;

          // Open the dialer using Linking module
          Linking.openURL(dialerUrl).catch((error) =>
            console.error("Error calling contact:", error)
          );
        } else {
          console.log("Selected contact does not have a phone number.");
        }
      } else {
        console.log("No contacts found.");
      }
    } else {
      console.log("Permission to access contacts was denied.");
    }
  };

  // Call the function to prompt the user to select a contact and make the call

  return (
    <View style={styles.container}>
      <Text style={styles.description}>It's time to relax! Discover our selection of suggestions that help you find peace and quiet in the chaos of everyday life.</Text>
      <View>
        <View style={styles.buttonContainer}>
        <Button
          // title="Take some time to breath out!"
          title="Listen to some relaxing music!"
          onPress={openYoutubeMusic}
          style={styles.button}
        />
        </View>
        <View style={styles.buttonContainer}>
        <Button
          title="Take some time to breath out!"
          onPress={openYoutubeYoga}
          style={styles.button}
        />
        </View>
        <View style={styles.buttonContainer}>
        <Button
          title="Dive into a world of memes!"
          onPress={open9gag}
          style={styles.button}
        />
        </View>
        <View style={styles.buttonContainer}>
        <Button
          title="Ring someone and spread some joy！"
          onPress={callContact}
          style={styles.button}
        />
        </View>
      </View>
    </View>
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
    fontSize: 18,
    marginBottom: 16,
  },
  buttonContainer: {
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
