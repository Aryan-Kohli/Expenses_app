import React from "react";
import { Text, Button, View, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../colors";
export default function WelcomeScreen({ navigation }) {
  function goToAllEvents() {
    navigation.navigate("AllEvents");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcomehead}>Welcome to all Expenses App</Text>
      <TouchableOpacity onPress={goToAllEvents} style={styles.getStartedbtn}>
        <Text style={styles.btnText}>GET STARTED !</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  welcomehead: {
    fontSize: 45,
    color: COLORS.mahroon,
    fontWeight: "400",
  },
  getStartedbtn: {
    backgroundColor: COLORS.yellow,
    color: COLORS.mahroon,
    padding: 10,
    fontSize: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: COLORS.mahroon,
    fontSize: 20,
  },
});
