import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import userImage from "./../assets/images/usernotfound.jpg";
import { firebase } from "../services/firebaseHelper";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Details({ navigation, route }) {
  const [stdData, setStdData] = useState("");
  const [stdId, setStId] = useState("");

  const { id } = route.params;

  useEffect(() => {
    // getting curCrent user data
    setStId(id);
    async function getdata() {
      firebase
        .firestore()
        .collection("students")
        .doc(id)
        .get()
        .then((snapshot) => {
          const student = snapshot.data();
          setStdData(student);
        });
    }
    getdata();
  }, []);

  return (
    <Card containerStyle={{ margin: 0 }}>
      <Card.Title style={{ fontSize: 22 }}>
        {stdData.firstName} {stdData.lastName}
      </Card.Title>
      <Card.Divider />
      <Card.Image
        style={{
          padding: 0,
          height: 300,
          borderRadius: 30,
          marginBottom: 20,
        }}
        resizeMode="cover"
        source={stdData.image ? { uri: stdData.image } : userImage}
      />

      <Text style={{ marginBottom: 10, fontSize: 20 }}>Roll No. :</Text>
      <Animatable.Text
        animation={"fadeInRightBig"}
        style={{ marginBottom: 10 }}
      >
        {stdData.rollNo}
      </Animatable.Text>
      <Text style={{ marginBottom: 10, fontSize: 20 }}>Email :</Text>
      <Animatable.Text
        animation={"fadeInRightBig"}
        style={{ marginBottom: 10 }}
      >
        {stdData.email}
      </Animatable.Text>
      <Text style={{ marginBottom: 10, fontSize: 20 }}>Class :</Text>
      <Animatable.Text
        animation={"fadeInRightBig"}
        style={{ marginBottom: 10 }}
      >
        {stdData.userclass}
      </Animatable.Text>
      <Text style={{ marginBottom: 10, fontSize: 20 }}>Status :</Text>
      <Animatable.Text
        animation={"fadeInRightBig"}
        style={{ marginBottom: 10 }}
      >
        {stdData.status === "true" ? (
          <Text>Active</Text>
        ) : (
          <Text>Restrict</Text>
        )}
      </Animatable.Text>
    </Card>
  );
}

export { Details };
