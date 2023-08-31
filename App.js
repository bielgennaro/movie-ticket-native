import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/home/index";
import { TabNavigator } from "./src/components/navigator";
import MovieDetails from "./src/pages/details/index";
import { Login } from "./src/pages/login";
import { UserRegister } from "./src/pages/userRegister";
import { MovieRegister } from "./src/pages/movieRegister";
import Provider from "./src/components/Provider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{ animation: "default" }}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="UserRegister"
            component={UserRegister}
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="MovieRegister"
            component={MovieRegister}
            options={{ animation: "slide_from_bottom" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
