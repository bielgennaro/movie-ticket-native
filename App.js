import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/home/index";
import Settings from "./src/settings/index";
import TabNavigator from "./components/navigator";
import MovieDetails from "./src/details/index";

const Stack = createNativeStackNavigator();

const routesName = {
  home: "Filmes em Cartaz",
  settings: "Settings",
};

export default function App() {
  return (
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
          options={{ animation: "slide_from_right" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
