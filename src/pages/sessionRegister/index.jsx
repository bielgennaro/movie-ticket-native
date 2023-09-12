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
import { options } from "../../helper/dataSession";
import { styles } from "./styles";

export const SessionRegister = ({ navigation }) => {
  const [fieldsValue, setFieldsValue] = useState({});

  const values = {
    avaiableTickets: {
      required: true,
      placeholder: "Quantidade de Ingressos Disponíveis",
    },
    hour: {
      required: true,
      placeholder: "Horário",
    },
    movie: {
      required: true,
      isDropdown: true,
      placeholder: "Filme",
      options: options,
    },
  };

  const onChangeFields = (fieldName, text) => {
    setFieldsValue((prevState) => ({ ...prevState, [fieldName]: text }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Fields values={values} onChangeFields={onChangeFields} />
      </View>
    </SafeAreaView>
  );
};
