import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserContext from "../../context";
import { Home } from "../../pages/home/index";
import { Login } from "../../pages/login";
import { SessionRegister } from "../../pages/sessionRegister";
import UserList from "../../pages/userList";
import { UserTickets } from "../../pages/userScreen";

const Tab = createBottomTabNavigator();

const routesName = {
  home: "Filmes em Cartaz",
  login: "Login",
  sessionRegister: "Cadastro de Sessão",
  userScreen: "Usuário",
  userList: "Listagem de Usuários",
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
            nameIcon = "home";
          } else if (
            route.name === routesName.login ||
            route.name === routesName.userScreen ||
            route.name === routesName.userList
          ) {
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
      {!user.isLoggedIn && (
        <Tab.Screen name={routesName.login} component={Login} />
      )}
      {user.isLoggedIn && !user.isAdmin && (
        <Tab.Screen name={routesName.userScreen} component={UserTickets} />
      )}
      {user.isLoggedIn && user.isAdmin && (
        <Tab.Screen name={routesName.userList} component={UserList} />
      )}
      {user.isAdmin && (
        <Tab.Screen
          name={routesName.sessionRegister}
          component={SessionRegister}
        />
      )}
    </Tab.Navigator>
  );
}
