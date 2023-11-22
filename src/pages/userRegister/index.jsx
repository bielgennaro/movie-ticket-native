import { useMemo, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Fields } from "../../components/fields";
import { Header } from "../../components/header";
import { styles } from "./style";
import ToastManager, { Toast } from "toastify-react-native";

export const UserRegister = ({ navigation }) => {
  const [fieldsValue, setFieldsValue] = useState({});
  const route = useRoute();
  const { params } = route;

  const values = {
    email: {
      required: true,
      isEmail: true,
      placeholder: "E-mail",
      initialValue: params?.user.email,
    },
    confirmEmail: {
      required: true,
      placeholder: "Confirme seu E-mail",
      confirmField: "email",
      initialValue: params?.user.email,
    },
    password: {
      required: true,
      isPassword: true,
      placeholder: "Senha",
    },
    confirmPassword: {
      required: true,
      isPassword: true,
      placeholder: "Confirme sua Senha",
      confirmField: "password",
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

  const getUrl = () => {
    if (params) {
      return `https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/users/update/${params.user.id}`;
    }

    return "https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/users/register";
  };

  const getMethod = () => {
    if (params) {
      return "PUT";
    }

    return "POST";
  };

  handleSubmit = () => {
    const paramsRest = JSON.stringify({
      email: fieldsValue.email,
      password: fieldsValue.password,
      isAdmin: false,
    });

    fetch(getUrl(), {
      method: getMethod(),
      headers: {
        "Content-Type": "application/json",
      },
      body: paramsRest,
    })
      .then((response) => {
        const res = JSON.stringify(response);

        if (response.ok) {
          showToasts("Usuário cadastrado com sucesso!", "success");
          if (!params) {
            navigation.push("Login");
          } else {
            navigation.push("Tab");
          }
        } else {
          showToasts("Erro ao cadastrar usuário!", "error");
        }
      })
      .catch(() =>
        showToasts(
          "Ocorreu um erro interno, favor contate o administrador",
          "error"
        )
      );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <ScrollView>
        <View style={styles.viewContainer}>
          <ToastManager />
          <Header onPress={() => navigation.goBack()} title="Cadastre-se" />
          <MaterialIcons name="account-circle" size={200} color="#fff" />
          <Fields
            values={values}
            onChangeFields={onChangeFields}
            textButton="Entrar"
            handleSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
