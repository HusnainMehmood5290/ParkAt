// App.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import splash from "../screens/splash";
import Register from "../screens/Register";
import RegisterVo from "../screens/RegisterVo";
import RegisterSp from "../screens/RegisterSp";
import Login from "../screens/Login";
import Main from "../screens/Main";
import TodayParking from "../screens/TodayParking";

//Drawer Layout
import HomeVoDrawer from "./HomeVoDrawer";
import HomeSpDrawer from "./HomeSpDrawer";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Registration" component={Register} />
        <Stack.Screen name="Register Space" component={RegisterSp} />
        <Stack.Screen name="Register Vehicle" component={RegisterVo} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Today Parkings" component={TodayParking} />

        <Stack.Screen
          name="HomeVo"
          component={HomeVoDrawer}
          options={{ headerShown: false }} // hide header for the drawer navigator
        />
        <Stack.Screen
          name="HomeSp"
          component={HomeSpDrawer}
          options={{ headerShown: false }} // hide header for the drawer navigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
