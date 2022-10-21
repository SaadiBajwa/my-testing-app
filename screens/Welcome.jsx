import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Animatable.View animation={"fadeInRightBig"} style={styles.part1}>
        <Animatable.Text
          animation="pulse"
          iterationCount={"infinite"}
          direction="alternate"
          style={styles.headingtext}
        >
          Welcome
        </Animatable.Text>
      </Animatable.View>
      <Animatable.View animation={"fadeInUpBig"} style={styles.part2}>
        <Text style={styles.text1}>Stay Conected with us</Text>
        <Text style={styles.text2}>Sign In with account</Text>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.buttontext}>Let's Start</Text>
          <Text style={styles.buttontext}>
            <Ionicons name="chevron-forward-outline" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  part1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  part2: {
    flex: 1,
    backgroundColor: "#eee",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
  },
  headingtext: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  text1: {
    fontSize: 22,
    color: "#45a384",
  },
  text2: {
    fontSize: 16,
    color: "#45a384",
  },
  buttonstyle: {
    backgroundColor: "green",
    borderRadius: 10,
    marginTop: 30,
    width: "50%",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttontext: {
    fontSize: 20,
    padding: 10,
    color: "#fff",
  },
});
