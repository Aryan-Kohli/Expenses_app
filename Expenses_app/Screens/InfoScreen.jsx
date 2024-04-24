import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
} from "react-native";

import COLORS from "../colors";
export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingTop: 0,
          paddingHorizontal: 10,
          backgroundColor: COLORS.white,
        }}
      >
        <Text style={styles.heads}>Made by :</Text>
        <Text style={styles.heads}>Aryan Kohli</Text>
        {/* <Text style={styles.heads}>& Yashika</Text> */}
        <Text style={styles.heads}>Instructed by : </Text>
        <Text style={styles.heads}>Mrs. Anshika Negi</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  heads: {
    fontSize: 25,
    color: COLORS.mahroon,
    fontWeight: "700",
  },
});
