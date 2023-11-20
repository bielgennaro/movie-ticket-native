import { useMemo, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Fields } from "../../components/fields";
import { Header } from "../../components/header";
import { styles } from "./style";
import ToastManager, { Toast } from "toastify-react-native";

export const UserRegister = ({ navigation }) => {
  const [fieldsValue, setFieldsValue] = useState({});

  const values = {
    email: {
      required: true,
      isEmail: true,
      placeholder: "E-mail",
    },
    confirmEmail: {
      required: true,
      placeholder: "Confirme seu E-mail",
      confirmField: "email",
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

  handleSubmit = () => {
    const params = JSON.stringify({
      email: fieldsValue.email,
      password: fieldsValue.password,
      isAdmin: fieldsValue?.isAdmin || false,
    });

    fetch("https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: params,
    })
      .then((response) => {
        const res = JSON.stringify(response);

        if (response.ok) {
          showToasts("Usuário cadastrado com sucesso!", "success");
          navigation.push("Login");
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
    </SafeAreaView>
  );
};
