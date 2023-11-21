import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { MovieCard } from "../../components/movieCard";
import { styles } from "./style";
import { Button } from "../../components/button";
import UserContext from "../../context";
import ToastManager, { Toast } from "toastify-react-native";

export const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchMovies = async () => {
      fetch("https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const res = await response.json();

          if (response.ok) {
            if (!res.length) {
              Toast.warn("Não há Filmes!");
            } else {
              setData(res);
            }
          } else {
            Toast.error("Não foi possível carregar os Filmes!");
          }
        })
        .catch((error) => Toast.error("Erro ao carregar os Filmes!"));
    };

    fetchMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <ToastManager />
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={({ item }) => (
          <MovieCard {...item} navigation={navigation} />
        )}
        data={data}
        keyExtractor={({ id }) => id}
      />
      {user.isAdmin && (
        <Button onPress={() => navigation.push("MovieRegister")} type="new" />
      )}
    </SafeAreaView>
  );
};
