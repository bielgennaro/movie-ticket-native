import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Home from "../../pages/home/index";
import { Login } from "../../pages/login";

const Tab = createBottomTabNavigator();

const routesName = {
  home: "Filmes em Cartaz",
  login: "Login",
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={routesName.home}
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#d9232a" },
        tabBarIcon: ({ focused, size }) => {
          let nameIcon;

          if (route.name === routesName.home) {
            nameIcon = focused ? "home-filled" : "home";
          } else if (route.name === routesName.login) {
            nameIcon = "person";
          }

          return (
            <MaterialIcons
              name={nameIcon}
              size={size}
              color={focused ? "#b3b3b3" : "#ffff"}
            />
          );
        },
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "#d9232a" },
        headerTitleStyle: { color: "white" },
      })}
    >
      <Tab.Screen name={routesName.home} component={Home} />
      <Tab.Screen name={routesName.login} component={Login} />
    </Tab.Navigator>
  );
}
