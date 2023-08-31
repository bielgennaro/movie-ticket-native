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

  const onChangeFields = (fieldName, text) => {
    setFieldsValue((prevState) => ({ ...prevState, [fieldName]: text }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.viewContainer}>
        <Header onPress={() => navigation.goBack()} title="Cadastre-se" />
        <MaterialIcons name="account-circle" size={200} color="#fff" />
        <Fields
          values={values}
          onChangeFields={onChangeFields}
          textButton="Entrar"
        />
      </View>
    </SafeAreaView>
  );
};
