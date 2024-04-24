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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function CombinedDataBox({ item, index }) {
  return (
    <>
      {index == 0 && (
        <View style={styles.blackLine}>
          <Text>aa</Text>
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <Text style={styles.desc}>{item.desc}</Text>
          <View style={{}}>
            <Text style={styles.amount}>
              {item.type == "credit" ? "+" : "-"} ₹{item.amount}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  desc: {
    fontSize: 16,

    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  blackLine: {
    height: 1,
    backgroundColor: "black",
    width: "100%",
  },
});
