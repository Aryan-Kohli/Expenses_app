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
import CombinedDataBox from "../components/CombinedDataBox";
import { Picker } from "@react-native-picker/picker";
export default function CombinedScreen({ route, navigation }) {
  const { event } = route.params;
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedValue, setSelectedValue] = useState("credit");
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [balance, setBalance] = useState(0);
  const toggleModal = () => {
    console.log("toggling");
    setModalVisible(!isModalVisible);
  };
  async function addTransaction() {
    if (desc === "" || amount === 0) {
      console.log(desc, amount, selectedValue);
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
    } else {
      const newTransaction = {
        desc,
        amount,
        type: selectedValue,
      };

      try {
        const events = await AsyncStorage.getItem("events");
        if (events !== null) {
          const eventsArray = JSON.parse(events);
          const foundEvent = eventsArray.find(
            (thisevent) => thisevent.name === event.name
          );
          if (foundEvent) {
            foundEvent.transactions.push(newTransaction);
            if (selectedValue === "credit") {
              foundEvent.totalCredit += parseInt(amount); //parseInt converts string to number
            } else {
              foundEvent.totalDebit += parseInt(amount);
            }
            foundEvent.balance = foundEvent.totalCredit - foundEvent.totalDebit;
            await AsyncStorage.setItem("events", JSON.stringify(eventsArray));
            ToastAndroid.show(
              "Transaction added successfully",
              ToastAndroid.SHORT
            );
            setData(foundEvent.transactions);
            setBalance(foundEvent.balance);
            setTotalCredit(foundEvent.totalCredit);
            setTotalDebit(foundEvent.totalDebit);
          } else {
            ToastAndroid.show("Event not found", ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show("No events found", ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error("Error:", error.message);
        ToastAndroid.show("Error adding transaction", ToastAndroid.SHORT);
      }

      toggleModal();
    }
  }
  useEffect(() => {
    setData(event.transactions);
    console.log("transaction are", event.transactions);
    setTotalCredit(event.totalCredit);
    setTotalDebit(event.totalDebit);
    setBalance(event.balance);
  }, [event]);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingTop: 45,
          flexDirection: "row",
          alignItems: "center",
          gap: 25,
          backgroundColor: COLORS.yellow,
          paddingHorizontal: 20,
          paddingBottom: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 5,
            borderWidth: 2,
            borderColor: COLORS.mahroon,
            borderRadius: 10,
          }}
        >
          <Ionicons name="arrow-back" size={26} color={COLORS.mahroon} />
        </TouchableOpacity>
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: COLORS.darkBlue }}
        >
          {event.name}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          marginVertical: 15,
          borderWidth: 3,
          width: "24%",
          paddingHorizontal: 10,
        }}
        onPress={() => toggleModal()}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Add +</Text>
      </TouchableOpacity>
      <ScrollView style={{ marginBottom: 20 }}>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return <CombinedDataBox key={index} item={item} index={index} />;
          })}
      </ScrollView>
      <View
        style={{
          // paddingHorizontal: 10,
          // paddingVertical: 15,
          height: 118,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 5,
            alignItems: "center",
            backgroundColor: "#122b13",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginLeft: 35,
              color: "white",
            }}
          >
            TOTAL CREDIT :{" "}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "800",
              position: "absolute",
              left: "55%",
              color: "white",
            }}
          >
            {totalCredit}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 5,
            alignItems: "center",
            backgroundColor: "#571e0e",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginLeft: 35,
              color: "#ffffff",
            }}
          >
            TOTAL DEBIT :{" "}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "800",
              position: "absolute",
              left: "55%",
              color: "#ffffff",
            }}
          >
            {totalDebit}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 4,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "500", marginLeft: 35 }}>
            BALANCE :{" "}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              position: "absolute",
              left: "55%",
            }}
          >
            {balance}
          </Text>
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: "wheat",
            height: 400,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Enter the Title of Transaction.
          </Text>
          <TextInput
            style={{
              height: 50,
              backgroundColor: "white",
              color: "black",
              paddingVertical: 5,
              paddingLeft: 10,
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
              borderColor: "black",
              borderWidth: 2,
            }}
            placeholder="Enter Event name"
            placeholderTextColor={"gray"}
            onChangeText={(text) => setDesc(text)}
          ></TextInput>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Enter the Amount of Transaction.
          </Text>
          <TextInput
            style={{
              height: 50,
              backgroundColor: "white",
              color: "black",
              paddingVertical: 5,
              paddingLeft: 10,
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
              borderColor: "black",
              borderWidth: 2,
            }}
            keyboardType="numeric"
            placeholder="Enter amount "
            placeholderTextColor={"gray"}
            onChangeText={(num) => setAmount(num)}
          ></TextInput>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={{
              backgroundColor: COLORS.darkBlue,
              color: "white",
            }}
            dropdownIconColor="white"
            borderWidth={2}
            borderRadius={10}
          >
            <Picker.Item label="CREDIT" value="credit" />
            <Picker.Item label="DEBIT" value="debit" />
          </Picker>
          <View
            style={{
              flexDirection: "row",
              marginTop: 25,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.darkGreen,
                paddingVertical: 16,
                paddingHorizontal: 12,
                borderRadius: 10,
                borderRadius: 10,
              }}
              onPress={() => addTransaction()}
            >
              <Text style={{ color: "#ffffff", fontSize: 16 }}>
                ADD TRANSACTION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.mahroon,
                paddingVertical: 16,
                paddingHorizontal: 12,
                borderRadius: 10,
              }}
              onPress={() => toggleModal()}
            >
              <Text style={{ color: "#ffffff", fontSize: 18 }}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingTop: 20,
  },
});
