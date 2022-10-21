import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "../screens/Welcome";
import Register from "../screens/Register";
import Login from "../screens/Login";
import { Home } from "../screens/StudentProfileList";
import { Chat } from "../screens/Chat";
import { Details } from "../screens/StudentProfile";
import { AntDesign } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="contacts"
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="wechat"
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Register" component={Register}></Stack.Screen>

        <Stack.Screen name="HomeNav" component={HomeNav}></Stack.Screen>
        <Stack.Screen name="Details" component={Details}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export { Nav };
