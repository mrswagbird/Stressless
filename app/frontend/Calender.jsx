import { useEffect, useState } from "react";
import { findEvents } from "react-native-calendar-events";

const Calender = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const beginningOfDay = new Date();
        beginningOfDay.setHours(0, 0, 0, 0);
        const events = await findEvents({
          startDate: beginningOfDay,
          endDate: new Date(),
        });
        setCalendarEvents(events);
        console.log("Events at the beginning of the day:", events);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Calendar Events
      </Text>
      <FlatList
        data={calendarEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Calender;
