import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserContext from "../../context";
import { Home } from "../../pages/home/index";
import { Login } from "../../pages/login";
import { SessionRegister } from "../../pages/sessionRegister";

const Tab = createBottomTabNavigator();

const routesName = {
  home: "Filmes em Cartaz",
  login: "Login",
  sessionRegister: "Cadastro de Sessão",
};

export function TabNavigator() {
  const user = useContext(UserContext);

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
          } else if (route.name === routesName.sessionRegister) {
            nameIcon = "movie-creation";
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
      {!user.isAdmin && (
        <Tab.Screen
          name={routesName.sessionRegister}
          component={SessionRegister}
        />
      )}
    </Tab.Navigator>
  );
}
