import { Alert } from "react-native";
import { firebase } from "./firebaseHelper";
import { saveSession } from "./sessionHelper";

function addAuthUser(
  rollNo,
  firstName,
  lastName,
  userclass,
  email,
  password,
  image,
  navigation
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const userId = response.user.uid;
      addusersfirebase(
        userId,
        rollNo,
        firstName,
        lastName,
        userclass,
        email,
        image,
        navigation
      );
    })
    .catch((error) => {
      alert(error.message);
    });
}
function addusersfirebase(
  uid,
  rollNo,
  firstName,
  lastName,
  userclass,
  email,
  image,
  navigation
) {
  const status = "true";
  firebase
    .firestore()
    .collection("students")
    .doc(uid)
    .set({ rollNo, firstName, lastName, userclass, email, image, status })
    .then(() => {
      navigation.navigate("Login");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function attempToLogin(email, password, navigation) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = firebase.auth().currentUser.uid;
      saveSession(uid);
      navigation.replace("HomeNav");
    })
    .catch((error) => {
      Alert.alert("Warning!", "Email or password is invalid");
    });
}

/*
function getUsersData(uid) {
  const value = firebase.firestore().collection("contacts").doc(uid).get();
  return value;
}
export async function getUserByUID(UID) {
  return await firebase.database().ref(`contacts/${UID}`).once("value");
}
*/
export { addAuthUser, attempToLogin };
