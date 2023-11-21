import { useRoute } from "@react-navigation/native";
import { useMemo, useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button } from "../../components/button";
import { Fields } from "../../components/fields";
import { Header } from "../../components/header";
import { styles } from "./style";
import ToastManager, { Toast } from "toastify-react-native";
import UserContext from "../../context";

export const Login = ({ navigation }) => {
  const route = useRoute();
  const userContext = useContext(UserContext);
  const { params } = route;
  const [fieldsValue, setFieldsValue] = useState({});

  const values = {
    email: {
      required: true,
      isEmail: true,
      placeholder: "E-mail",
    },
    password: {
      required: true,
      isPassword: true,
      placeholder: "Senha",
    },
  };

  const showToasts = (message, type) => {
    if (type === "success") {
      Toast.success(message);
    }

    if (type === "error") {
      Toast.error(message);
    }
  };

  const onChangeFields = (fieldName, text) => {
    setFieldsValue((prevState) => ({ ...prevState, [fieldName]: text }));
  };

  const handleSubmit = () => {
    const requestParams = JSON.stringify({
      email: fieldsValue.email,
      password: fieldsValue.password,
      isAdmin: fieldsValue.isAdmin || false,
    });

    fetch("https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestParams,
    })
      .then(async (response) => {
        try {
          if (response.ok) {
            const res = await response.json();

            navigation.push("Tab");
            userContext.setIsLoggedIn(true);
            userContext.setIsAdmin(res.isAdmin);
            userContext.setUserId(res.id);
          } else {
            showToasts("Erro ao realizar Login!", "error");
          }
        } catch (error) {
          showToasts(
            "Ocorreu um erro interno. Favor contatar o administrador.",
            "error"
          );
        }
      })
      .catch((error) => {
        showToasts(
          "Ocorreu um erro durante a requisição. Verifique sua conexão.",
          "error"
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {params?.isFromMovieDetails && (
        <Header title={"Login"} onPress={() => navigation.goBack()} />
      )}
      <View style={styles.viewContainer}>
        <ToastManager />
        <MaterialIcons name="account-circle" size={200} color="#fff" />
        <Fields
          values={values}
          onChangeFields={onChangeFields}
          handleSubmit={handleSubmit}
          textButton="Entrar"
        />
        <Button
          type="secondary"
          text="Cadastre-se"
          onPress={() => navigation.push("UserRegister")}
        />
      </View>
    </SafeAreaView>
  );
};
