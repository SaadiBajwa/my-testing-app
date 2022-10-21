import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text, StyleSheet, Alert } from "react-native";
import { firebase } from "./../services/firebaseHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "@rneui/themed";
function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [stdData, setStdData] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getCurrentUser();
    const unsub = firebase
      .firestore()
      .collection("newchats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsub;
  }, []);
  const updateSearch = (searchText) => {
    setSearchText(searchText);
    if (searchText !== "") {
      const newContactList = messages.filter((msg) => {
        return Object.values(msg)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(messages);
    }
  };
  async function getCurrentUser() {
    const user = await AsyncStorage.getItem("@storage_Key");
    const userid = JSON.parse(user);
    if (userid === "OptvRm3PfvR0KEv2KAk8qWb4vBj1") {
      setAdmin(true);
    }
    firebase
      .firestore()
      .collection("students")
      .doc(userid)
      .get()
      .then((snapshot) => {
        const student = snapshot.data();
        setStdData(student);
      });
  }

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    firebase.firestore().collection("newchats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
  return (
    <>
      {admin ? (
        <>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(searchText) => updateSearch(searchText)}
            value={searchText}
            lightTheme={true}
          />
          <GiftedChat
            messages={searchText.length < 1 ? messages : searchResults}
            showAvatarForEveryMessage={true}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1,
              name: "admin",
              avatar:
                "https://cdn.pixabay.com/photo/2020/12/27/20/24/smile-5865208_1280.png",
            }}
          />
        </>
      ) : stdData.status === "true" ? (
        <>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(searchText) => updateSearch(searchText)}
            value={searchText}
            lightTheme={true}
          />
          <GiftedChat
            messages={searchText.length < 1 ? messages : searchResults}
            showAvatarForEveryMessage={true}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: stdData.email,
              name: stdData.firstName,
              avatar: stdData.image,
            }}
          />
        </>
      ) : (
        <View style={styles.container}>
          <Text>You are blocked</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { Chat };
