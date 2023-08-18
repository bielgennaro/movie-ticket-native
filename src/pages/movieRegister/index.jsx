import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { Button } from "../../components/button";
import { Fields } from "../../components/fields";
import { Header } from "../../components/header";
import { styles } from "./style";

export const MovieRegister = ({ navigation }) => {
  const values = {
    title: {
      required: true,
      placeholder: "Título",
    },
    gender: {
      required: true,
      placeholder: "Gênero",
    },
    director: {
      required: true,
      placeholder: "Diretor",
    },
    synopsis: {
      required: true,
      maxLength: 255,
      placeholder: "Sinopse",
    },
    bannerUrl: {
      required: true,
      placeholder: "URL do banner",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#000" />
        <Header title="Registro de Filme" onPress={() => navigation.goBack()} />
        <View style={styles.viewContainer}>
          <Fields values={values} />
          <Button text="Salvar" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
