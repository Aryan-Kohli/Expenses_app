import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import COLORS from "../colors";
import EventBox from "../components/EventBox.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AllEventsSceen({ navigation }) {
  const [newevent, setNewevent] = useState("");
  const [events, setEvents] = useState([]);
  function saveEvent() {
    const pattern = /^(?!\s)(?!.*\s$).*/;
    if (pattern.test(newevent)) {
      if (newevent.length > 15) {
        ToastAndroid.show("Length can't be greater than 15", ToastAndroid.show);
        return;
      }
      if (newevent.length == 0) {
        ToastAndroid.show("Enter a valid Event name", ToastAndroid.show);
        return;
      }

      try {
        const obj = {
          name: newevent,
          date: new Date(),
          transactions: [],
          totalCredit: 0,
          totalDebit: 0,
          balance: 0,
        };
        setEvents([...events, obj]);
        console.log(events);
        AsyncStorage.setItem("events", JSON.stringify([...events, obj]));
        setNewevent("");
      } catch (e) {
        console.log(e);
      }

      ToastAndroid.show(`Event is Saved`, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "Event name cannot contain leading or trailing spaces",
        ToastAndroid.SHORT
      );
    }
  }
  function deleteEvent(event) {
    console.log("EVENT", event);
    const filteredEvents = events.filter((e) => e !== event);
    setEvents(filteredEvents);
    AsyncStorage.setItem("events", JSON.stringify(filteredEvents));
  }
  function openEvent(event) {
    console.log("EVENT", event.name);
    navigation.navigate("CombinedScreen", { event: event });
  }
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const allevents = await AsyncStorage.getItem("events");
        if (allevents) {
          const parsedEvents = JSON.parse(allevents);
          console.log("PARSED EVENTS", parsedEvents);
          setEvents(parsedEvents);
          setNewevent("");
        } else {
          console.log("IT IS NULL", allevents);
        }
      } catch (error) {
        console.error("Error loading events from AsyncStorage:", error);
      }
    };

    loadEvents();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.yellow,
          paddingTop: 60,
          paddingBottom: 25,
          paddingHorizontal: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontSize: 20, color: COLORS.mahroon, fontWeight: "700" }}
          >
            Create an event
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.yellow,
              width: 55,
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 8,
              borderColor: COLORS.mahroon,
              borderWidth: 4,
            }}
            onPress={() => navigation.navigate("InfoScreen")}
          >
            <Text
              style={{ color: COLORS.mahroon, fontSize: 16, fontWeight: "700" }}
            >
              INFO
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            height: 50,
            backgroundColor: COLORS.white,
            color: COLORS.mahroon,
            paddingVertical: 5,
            paddingLeft: 10,
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20,
            borderColor: COLORS.mahroon,
            borderWidth: 2,
          }}
          placeholder="Enter Event name"
          placeholderTextColor={COLORS.blue}
          onChangeText={(text) => setNewevent(text)}
        ></TextInput>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.mahroon,
            color: COLORS.white,
            padding: 10,
            width: 120,
            borderRadius: 10,
          }}
          onPress={saveEvent}
        >
          <Text style={{ color: COLORS.white, fontSize: 18 }}>Save Event</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginBottom: 30, marginTop: 20 }}>
        {events.length > 0 &&
          events.map((event, index) => (
            <EventBox
              key={index}
              event={event}
              deleteEvent={deleteEvent}
              openEvent={openEvent}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
