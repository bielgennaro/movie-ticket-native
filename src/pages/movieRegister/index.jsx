import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { Button } from "../../components/button";
import { Fields } from "../../components/fields";
import { Header } from "../../components/header";
import { styles } from "./style";
import ToastManager, { Toast } from "toastify-react-native";

export const MovieRegister = ({ navigation }) => {
  const [fieldsValue, setFieldsValue] = useState({});
  const route = useRoute();
  const { params } = route;

  const values = {
    title: {
      required: true,
      placeholder: "Título",
      initialValue: params?.title,
    },
    gender: {
      required: true,
      placeholder: "Gênero",
      initialValue: params?.gender,
    },
    director: {
      required: true,
      placeholder: "Diretor",
      initialValue: params?.director,
    },
    synopsis: {
      required: true,
      maxLength: 255,
      placeholder: "Sinopse",
      initialValue: params?.synopsis,
    },
    bannerUrl: {
      required: true,
      placeholder: "URL do banner",
      initialValue: params?.bannerUrl,
    },
  };

  const onChangeFields = (fieldName, text) => {
    setFieldsValue((prevState) => ({ ...prevState, [fieldName]: text }));
  };

  const showToasts = (message, type) => {
    if (type === "success") {
      Toast.success(message);
    }

    if (type === "error") {
      Toast.error(message);
    }
  };

  const getUrl = () => {
    if (params) {
      return `https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/movies/update/${params.id}`;
    }

    return "https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/movies/register";
  };

  const getMethod = () => {
    if (params) {
      return "PUT";
    }

    return "POST";
  };

  const handleSubmit = () => {
    const paramsRest = JSON.stringify({
      gender: fieldsValue.gender || params.gender,
      synopsis: fieldsValue.synopsis || params.synopsis,
      title: fieldsValue.title || params.title,
      director: fieldsValue.director || params.director,
      bannerUrl: fieldsValue.bannerUrl || params.bannerUrl,
    });

    fetch(getUrl(), {
      method: getMethod(),
      headers: {
        "Content-Type": "application/json",
      },
      body: paramsRest,
    })
      .then((response) => {
        if (response.ok) {
          showToasts("Filme cadastrado com sucesso!", "success");
          navigation.push("Tab");
        } else {
          showToasts("Erro ao cadastrar Filme!", "error");
        }
      })
      .catch((error) => {
        showToasts(
          "Ocorreu um erro interno, favor contate o administrador",
          "error"
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ToastManager />
        <StatusBar backgroundColor="#000" />
        <Header
          title={!!params ? "Edição de Registro" : "Registro de Filme"}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.viewContainer}>
          <Fields
            values={values}
            onChangeFields={onChangeFields}
            handleSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
