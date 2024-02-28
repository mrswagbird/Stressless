import React from "react";
import { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View, Platform, StyleSheet } from "react-native";
import { Button } from "react-native-web";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "ce817dc5-beed-476d-9fc4-85a1e681f5da",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  useEffect(() => {
    console.log("registering for push notifications");
    registerForPushNotificationsAsync().then((token) => {
      console.log("token:", token);
      setExpoPushToken(token);
    });
  }, []);
  const sendNotification = async () => {
    console.log("push");
    const msg = {
      to: expoPushToken,
      title: "my notification",
      body: "my msg",
      sound: "default",
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(msg),
    });
  };
  return (
    <View>
      <Pressable
        style={{
          marginTop: 500,
          textAlign: "center",
          justifyContent: "center",
        }}
        onPress={sendNotification}
      >
        <Text>Track data</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
