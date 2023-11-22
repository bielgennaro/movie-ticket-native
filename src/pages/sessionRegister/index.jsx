import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
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
import { styles } from "./styles";
import ToastManager, { Toast } from "toastify-react-native";
import moment from "moment";

export const SessionRegister = ({ navigation }) => {
  const [fieldsValue, setFieldsValue] = useState({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { params } = route;
  console.log(params);

  const values = {
    avaiableTickets: {
      required: true,
      placeholder: "Quantidade de Ingressos Disponíveis",
      initialValue: params?.session.availableTickets.toString(),
    },
    date: {
      date: true,
      required: true,
      placeholder: "Horário",
      initialValue: params
        ? moment().format("HH:mm", params?.session.date)
        : null,
    },
    movie: {
      condition: true,
      required: true,
      isDropdown: true,
      placeholder: "Filme",
      options: movies,
      initialValue: params?.session.movieId,
    },
  };

  const getUrl = () => {
    if (params) {
      return `https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/sessions/update/${params.session.id}`;
    }

    return "https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/sessions/register";
  };

  const getMethod = () => {
    if (params) {
      return "PUT";
    }

    return "POST";
  };

  const showToasts = (message, type) => {
    if (type === "success") {
      Toast.success(message);
    }

    if (type === "error") {
      Toast.error(message);
    }
  };

  const fetchMovies = () =>
    fetch("https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

  useEffect(() => {
    fetchMovies()
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        showToasts(
          "Ocorreu um erro interno, favor contate o administrador",
          "error"
        );
      });
  }, []);

  const onChangeFields = (fieldName, text) => {
    setFieldsValue((prevState) => ({ ...prevState, [fieldName]: text }));
  };

  const handleSubmit = () => {
    const paramsRest = JSON.stringify({
      price: 15,
      availableTickets:
        Number.parseInt(fieldsValue.avaiableTickets) || params.avaiableTickets,
      date: fieldsValue.date || params.session.date,
      movieId: fieldsValue.movie || params.movie,
      movie: movies.find((m) => m.id === fieldsValue.movie),
    });

    console.log(paramsRest);

    fetch(getUrl(), {
      method: getMethod(),
      headers: {
        "Content-Type": "application/json",
      },
      body: paramsRest,
    })
      .then((response) => {
        console.log(response, "response");
        console.log(paramsRest, "paramsRest");
        if (response.ok) {
          showToasts("Sessão cadastrada com sucesso!", "success");
          navigation.push("Tab");
        } else {
          showToasts("Erro ao cadastrar Sessão!", "error");
          navigation.push("Tab");
        }
      })
      .catch((error) => {
        showToasts(
          "Ocorreu um erro interno, favor contate o administrador",
          "error"
        );
        navigation.push("Tab");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ToastManager />
        <Fields
          values={values}
          onChangeFields={onChangeFields}
          fetchOptions={fetchMovies}
          handleSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};
