import React, { useEffect } from "react";
import { Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
const requestCalendarPermissions = async () => {
  try {
    let permissionStatus;

    if (Platform.OS === "android") {
      permissionStatus = await check(PERMISSIONS.ANDROID.READ_CALENDAR);
    } else if (Platform.OS === "ios") {
      permissionStatus = await check(PERMISSIONS.IOS.CALENDARS);
    }

    if (permissionStatus === RESULTS.DENIED) {
      const result = await request(permissionStatus);

      if (result === RESULTS.GRANTED) {
        console.log("Calendar permission granted.");
      } else {
        console.log("Calendar permission denied.");
      }
    } else if (permissionStatus === RESULTS.GRANTED) {
      console.log("Calendar permission already granted.");
    }
  } catch (error) {
    console.error("Error requesting calendar permissions:", error);
  }
};

const CalendarContainer = () => {
  useEffect(() => {
    requestCalendarPermissions();
  }, []);

  return Calender; // You can replace this with your actual component JSX
};

export default CalendarContainer;
