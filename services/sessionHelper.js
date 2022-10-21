import AsyncStorage from "@react-native-async-storage/async-storage";

const saveSession = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem("@storage_Key", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getSession = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    jsonValue != null ? JSON.parse(jsonValue) : null;
    return jsonValue;
  } catch (e) {
    // error reading value
  }
};

async function remoevSession(navigation) {
  try {
    await AsyncStorage.setItem("@storage_Key", "");
    navigation.replace("Login");
  } catch (e) {
    // saving error
  }
}

export { saveSession, getSession, remoevSession };
