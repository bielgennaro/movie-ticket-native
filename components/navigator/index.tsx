import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Home from "../../src/home/index";
import Settings from "../../src/settings/index";

const Tab = createBottomTabNavigator();

const routesName = {
  home: "Filmes em Cartaz",
  settings: "Settings",
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
            nameIcon = "theaters";
          } else if (route.name === routesName.settings) {
            nameIcon = focused ? "settings" : "settings";
          }

          return (
            <MaterialIcons
              name={nameIcon}
              size={size}
              color={focused ? "#d3d3d3" : "#ffff"}
            />
          );
        },
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "#d9232a" },
        headerTitleStyle: { color: "white" },
      })}
    >
      <Tab.Screen name={routesName.home} component={Home} />
      <Tab.Screen name={routesName.settings} component={Settings} />
    </Tab.Navigator>
  );
}
