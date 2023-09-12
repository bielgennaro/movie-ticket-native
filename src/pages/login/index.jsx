import { useRoute } from "@react-navigation/native";
import { useMemo, useState, useEffect } from "react";
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

export const Login = ({ navigation }) => {
  const route = useRoute();
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

  const onChangeFields = (fieldName, text) => {
    setFieldsValue((prevState) => ({ ...prevState, [fieldName]: text }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {params?.isFromMovieDetails && (
        <Header title={"Login"} onPress={() => navigation.goBack()} />
      )}
      <View style={styles.viewContainer}>
        <MaterialIcons name="account-circle" size={200} color="#fff" />
        <Fields
          values={values}
          onChangeFields={onChangeFields}
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
