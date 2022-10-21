import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../services/firebaseHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import studentImage from "./../assets/images/usernotfound.jpg";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import { remoevSession } from "./../services/sessionHelper";
import { Loading } from "./../components/activityindicator";

function Home({ navigation }) {
  const [student, setStudent] = useState(null);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function check() {
      const uid = await AsyncStorage.getItem("@storage_Key");
      //  console.log(uid);
      const adId = JSON.parse(uid);
      // console.log(adId);
      if (adId === "OptvRm3PfvR0KEv2KAk8qWb4vBj1") {
        setAdmin(true);
      }
      firebase
        .firestore()
        .collection("students")
        .onSnapshot(function (querySnapshot) {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setStudent(data);
        });
    }
    check();
  }, []);
  async function updatestatus(id) {
    await firebase.firestore().collection("students").doc(id).set(
      {
        status: "false",
      },
      { merge: true }
    );
  }
  async function updatestatust(id) {
    await firebase.firestore().collection("students").doc(id).set(
      {
        status: "true",
      },
      { merge: true }
    );
  }
  async function deleteuser(id) {
    await firebase.firestore().collection("students").doc(id).delete();
  }

  const updateSearch = (text) => {
    setText(text);
    if (text !== "") {
      const newContactList = student.filter((students) => {
        return Object.values(students)
          .join(" ")
          .toLowerCase()
          .includes(text.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(student);
    }
  };
  const logOutPress = () => {
    remoevSession(navigation);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => updateSearch(text)}
        value={text}
        lightTheme={true}
      />
      <FlatList
        data={text.length < 1 ? student : searchResults}
        renderItem={({ item }) => (
          <View style={styles.cardcontainer}>
            <View style={styles.imgcontainer}>
              <Image
                source={item.image ? { uri: item.image } : studentImage}
                style={styles.imageStyle}
              ></Image>
            </View>
            <View style={styles.detailcontainer}>
              <TouchableOpacity
                onPress={(id) =>
                  navigation.navigate("Details", {
                    id: item.id,
                  })
                }
              >
                <Text style={styles.detailtext}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={styles.detailtext}>{item.userclass}</Text>
                <Text style={styles.detailtext}>{item.rollNo}</Text>
              </TouchableOpacity>
            </View>
            {admin ? (
              <View style={styles.actioncontainer}>
                <TouchableOpacity onPress={() => deleteuser(item.id)}>
                  <Entypo name="trash" size={24} color="red" />
                </TouchableOpacity>
                {item.status === "true" ? (
                  <TouchableOpacity onPress={() => updatestatus(item.id)}>
                    <AntDesign name="checksquare" size={24} color="green" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => updatestatust(item.id)}>
                    <Entypo name="squared-cross" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View style={styles.imgcontainer}></View>
            )}
          </View>
        )}
      ></FlatList>

      <FloatingAction
        color="red"
        floatingIcon={<Entypo name="log-out" size={24} color="white" />}
        onPressMain={logOutPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardcontainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#eee",
  },
  imgcontainer: {
    flex: 2,
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  detailcontainer: {
    flex: 6,
    justifyContent: "center",
    //  backgroundColor: "white",
  },
  actioncontainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: 30,
    width: 30,
    resizeMode: "center",
  },
  detailtext: {
    fontSize: 12,
  },
});

export { Home };
