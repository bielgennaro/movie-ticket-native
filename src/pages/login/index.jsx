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
import { Fields } from "../../components/fields";
import { Button } from "../../components/button";

export const Login = ({ navigation }) => {
  const values = {
    email: {
      required: true,
      email: true,
      placeholder: "E-mail",
    },
    password: {
      required: true,
      password: true,
      placeholder: "Senha",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <MaterialIcons name="account-circle" size={200} color="#fff" />
        <Fields values={values} />
        <Button text="Entrar" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#fff",
  },
  textInput: {
    backgroundColor: "transparent",
    color: "#fff",
    textAlign: "center",
    borderBottomColor: "#d9232a",
    borderBottomWidth: 1,
    width: "80%",
    height: 40,
  },
  viewContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
});
