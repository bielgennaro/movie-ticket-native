import { useRoute } from "@react-navigation/native";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { Button } from "../../components/button";
import { Fields } from "../../components/fields";
import { Header } from "../../components/header";
import { styles } from "./style";

export const MovieRegister = ({ navigation }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#000" />
        <Header
          title={!!params ? "Edição de Registro" : "Registro de Filme"}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.viewContainer}>
          <Fields values={values} />
          <Button text="Salvar" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
