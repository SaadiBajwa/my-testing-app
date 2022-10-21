import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Loading } from "../components/activityindicator";
import { attempToLogin } from "../services/firebaseauthhelper";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login({ navigation }) {
  const screen = Dimensions.get("window");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getuser();
  }, []);
  async function getuser() {
    const user = await AsyncStorage.getItem("@storage_Key");
    if (user) {
      navigation.replace("HomeNav");
    }
  }

  const loginPress = () => {
    if (email === "" || password === "") {
      Alert.alert("Warning!", "All fiels are mandatory");
    } else {
      setLoading(true);
      const timeout = setTimeout(() => {
        attempToLogin(email, password, navigation);
        setLoading(false);
      }, 3000);
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
            Login
          </Animatable.Text>
        </Animatable.View>
        <Animatable.View animation={"fadeInUpBig"} style={styles.part2}>
          <TextInput
            style={styles.inputstyle}
            placeholder="Email"
            onChangeText={setEmail}
          ></TextInput>
          <TextInput
            style={styles.inputstyle}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={true}
          ></TextInput>
          <TouchableOpacity style={styles.buttonstyle} onPress={loginPress}>
            {loading ? (
              <Text style={styles.buttontext}>
                <Loading />
              </Text>
            ) : (
              <Text style={styles.buttontext}>
                Login{"   "} <Entypo name="login" size={24} color="white" />
              </Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
      </View>

      <TouchableOpacity
        style={styles.bottomtext}
        onPress={() => navigation.navigate("Register")}
      >
        <Text>Don't have an account?</Text>
        <Text style={{ color: "blue" }}>SignUp</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "green",
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonstyle: {
    alignSelf: "center",
    backgroundColor: "green",
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 10,
  },
  buttontext: {
    fontSize: 22,
    padding: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomtext: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
});
