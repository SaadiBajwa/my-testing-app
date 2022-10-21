import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { addAuthUser } from "../services/firebaseauthhelper";
import { Loading } from "../components/activityindicator";
import { firebase } from "./../services/firebaseHelper";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import uuid from "react-native-uuid";
export default function Register({ navigation }) {
  const screen = Dimensions.get("screen");
  const [rollNo, setRollNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userclass, setUserClass] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [imageid, setImageId] = useState("");
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let imageId = uuid.v4();
    setImageId(imageId);
  }, []);
  const btnshowNext = () => {
    setShowNext(!showNext);
  };

  const pickImageAndUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    const ig = result.uri;
    if (!result.cancelled) {
      setLoading(true);
      let imageRef = firebase.storage().ref("users/");
      let img = await fetch(ig);
      let imgBlob = await img.blob();
      imageRef
        .child(imageid)
        .put(imgBlob)
        .then((response) => {
          firebase
            .storage()
            .ref("users/" + imageid)
            .getDownloadURL()
            .then((downloadResponse) => {
              setImage(downloadResponse);
              setLoading(false);
              alert("image Upload");
            })
            .catch((downloadError) => {
              console.log(downloadError);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const buttonRegister = () => {
    if (
      rollNo === "" ||
      firstName === "" ||
      lastName === "" ||
      image === "" ||
      userclass === "" ||
      email === "" ||
      password === "" ||
      cpassword === ""
    ) {
      Alert.alert("Warnign", "All fields are mandatory");
    } else if (password !== cpassword) {
      Alert.alert(
        "Password Error",
        "Password and Confirm password must be same"
      );
    } else {
      setLoading(true);
      const timeout = setTimeout(() => {
        addAuthUser(
          rollNo,
          firstName,
          lastName,
          userclass,
          email,
          password,
          image,
          navigation
        );
        setLoading(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  };
  return (
    <ScrollView contentContainerStyle={{ height: screen.height }}>
      <View style={styles.container}>
        <Animatable.View animation={"fadeInRightBig"} style={styles.part1}>
          <Animatable.Text
            animation="pulse"
            iterationCount={"infinite"}
            direction="alternate"
            style={styles.headingtext}
          >
            Register
          </Animatable.Text>
        </Animatable.View>
        <Animatable.View animation={"fadeInUpBig"} style={styles.part2}>
          {!showNext && (
            <>
              {!rollNo ? <Text style={styles.staric}>*</Text> : <Text></Text>}
              <TextInput
                style={styles.inputstyle}
                placeholder="Roll Number"
                onChangeText={setRollNo}
                value={rollNo}
              ></TextInput>
              {!firstName ? (
                <Text style={styles.staric}>*</Text>
              ) : (
                <Text></Text>
              )}
              <TextInput
                style={styles.inputstyle}
                placeholder="First Name"
                onChangeText={setFirstName}
                value={firstName}
              ></TextInput>
              {!lastName ? <Text style={styles.staric}>*</Text> : <Text></Text>}
              <TextInput
                style={styles.inputstyle}
                placeholder="Last Name"
                onChangeText={setLastName}
                value={lastName}
              ></TextInput>
              {!userclass ? (
                <Text style={styles.staric}>*</Text>
              ) : (
                <Text></Text>
              )}
              <TextInput
                style={styles.inputstyle}
                placeholder="Class"
                onChangeText={setUserClass}
                value={userclass}
              ></TextInput>
            </>
          )}
          {showNext ? (
            <>
              {!email ? <Text style={styles.staric}>*</Text> : <Text></Text>}
              <TextInput
                style={styles.inputstyle}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
              ></TextInput>
              {!password ? <Text style={styles.staric}>*</Text> : <Text></Text>}
              <TextInput
                style={styles.inputstyle}
                placeholder="Password"
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
              ></TextInput>
              {!cpassword ? (
                <Text style={styles.staric}>*</Text>
              ) : (
                <Text></Text>
              )}
              <TextInput
                style={styles.inputstyle}
                placeholder=" Confirm Password"
                onChangeText={setCPassword}
                secureTextEntry={true}
                value={cpassword}
              ></TextInput>
              {!cpassword ? (
                <Text></Text>
              ) : cpassword === password ? (
                <Text style={{ color: "green" }}>Password Matched</Text>
              ) : (
                <Text style={styles.staric}>Password not Matched</Text>
              )}
              {!image ? (
                <TouchableOpacity
                  style={styles.buttonstyle}
                  onPress={() => pickImageAndUpload()}
                >
                  {loading ? (
                    <Text style={styles.buttontext}>
                      <Loading />
                    </Text>
                  ) : (
                    <Text style={styles.buttontext}>
                      Select Photo{"  "}
                      <MaterialIcons
                        name="add-photo-alternate"
                        size={24}
                        color="white"
                      />
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={image ? false : true}
                  style={styles.buttonstyle}
                  onPress={buttonRegister}
                >
                  {loading ? (
                    <Text style={styles.buttontext}>
                      <Loading />
                    </Text>
                  ) : (
                    <Text style={styles.buttontext}>
                      Register{"   "}
                      <Entypo name="add-user" size={24} color="white" />
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={btnshowNext}>
                <Text>Back</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.buttonstyle} onPress={setShowNext}>
              {loading ? (
                <Text style={styles.buttontext}>
                  <Loading />
                </Text>
              ) : (
                <Text style={styles.buttontext}>
                  Next{"   "}
                  <Entypo name="forward" size={24} color="white" />
                </Text>
              )}
            </TouchableOpacity>
          )}
        </Animatable.View>
      </View>
    </ScrollView>
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
    flex: 2,
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
  inputstyle: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "green",
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonstyle: {
    alignSelf: "center",
    backgroundColor: "green",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginTop: 10,
    marginBottom: 10,
  },
  buttontext: {
    fontSize: 20,
    padding: 10,
    color: "#fff",
  },
  linktext: {
    alignItems: "center",
  },
  staric: {
    color: "red",
  },
});
