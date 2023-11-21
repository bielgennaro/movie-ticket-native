import { useRoute } from "@react-navigation/native";
import Picker from "@ouroboros/react-native-picker";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useCallback, useState, useEffect, useContext } from "react";
import { Header } from "../../components/header";
import { styles } from "./style";
import { Button } from "../../components/button";
import UserContext from "../../context";
import ToastManager, { Toast } from "toastify-react-native";
import moment from "moment";

export const MovieDetails = ({ navigation }) => {
  const [sessionHour, setSessionHour] = useState(null);
  const [tickets, setTickets] = useState([0, 0]);
  const [active, setActive] = useState(null);
  const [sessions, setSessions] = useState(null);
  const route = useRoute();
  const user = useContext(UserContext);
  const { params } = route;
  const [maxTickets, setMaxTickets] = useState();
  const discountedTicketOptions = [];
  const regularTicketOptions = [];

  useEffect(() => {
    if (sessionHour) {
      setMaxTickets(sessionHour.availableTickets);
    }
  }, [sessionHour]);

  useEffect(() => {
    const fetchSessions = async () => {
      fetch("https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/sessions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const res = await response.json();

          if (response.ok) {
            if (!res.length) {
              Toast.warn("Não há Sessões!");
            } else {
              setSessions(res);
            }
          } else {
            Toast.error("Não foi possível carregar as Sessões!");
          }
        })
        .catch((error) => Toast.error("Erro ao carregar as Sessões!"));
    };

    fetchSessions();
  }, []);

  const isDisabled = () => {
    return tickets[0] === 0 && tickets[1] === 0;
  };

  const getTotalTickets = useCallback(() => {
    return tickets.reduce((sum, total) => sum + total, 0);
  }, [tickets]);

  const handleRegularTicketChange = useCallback(
    (value) => {
      const remainingTickets = maxTickets - tickets[1] - value;

      if (remainingTickets >= 0) {
        setTickets([value, tickets[1]]);
      }
    },
    [tickets, maxTickets]
  );

  const handleDiscountedTicketChange = useCallback(
    (value) => {
      const remainingTickets = maxTickets - tickets[0] - value;

      if (remainingTickets >= 0) {
        setTickets([tickets[0], value]);
      }
    },
    [tickets, maxTickets]
  );

  const showToasts = (message, type) => {
    if (type === "success") {
      Toast.success(message);
    }

    if (type === "error") {
      Toast.error(message);
    }
  };

  const handleSaveTickets = () => {
    const requestParams = JSON.stringify({
      userId: user.userId,
      sessionId: sessionHour.id,
    });

    console.log(requestParams);

    fetch(
      "https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/tickets/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestParams,
      }
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          Toast.success("Ingressos reservados com sucesso!");
          navigation.push("Tab");
        } else {
          Toast.error("Erro ao reservar ingressos!");
        }
      })
      .catch((error) => {
        Toast.error("Ocorreu um erro interno, favor contate o administrador");
      });
  };

  const onPressButtonDelete = () => {
    fetch(
      `https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/movies/delete/${params.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          Toast.success("Filme deletado com sucesso!");
          navigation.push("Tab");
        } else {
          Toast.error("Erro ao deletar Filme!");
        }
      })
      .catch((error) => {
        Toast.error("Ocorreu um erro interno, favor contate o administrador");
      });
  };

  const onPressButtonDeleteSession = () => {
    fetch(
      `https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/sessions/delete/${sessionHour.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          showToasts("Sessão deletada com sucesso!", "success");
          navigation.push("Tab");
        } else {
          showToasts("Erro ao deletar Sessão!", "error");
        }
      })
      .catch((error) => {
        showToasts(
          "Ocorreu um erro interno, favor contate o administrador",
          "error"
        );
      });
  };

  const onPressSessionHour = (item, index) => {
    if (active === index) {
      setActive(null);
      setSessionHour(null);
    } else {
      setActive(index);
      setSessionHour(item);
    }
  };

  for (let i = 0; i <= maxTickets; i++) {
    regularTicketOptions.push({
      value: i,
      text: `${i}`,
    });
  }

  for (let i = 0; i <= maxTickets - tickets[0]; i++) {
    discountedTicketOptions.push({
      value: i,
      text: `${i}`,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <StatusBar backgroundColor="#000" />
            <ScrollView style={styles.scrollView}>
              <Header
                onPress={() => navigation.goBack()}
                title="Detalhes do Filme"
              />
              <Image
                style={styles.screenImage}
                source={{ uri: params.bannerUrl }}
              />
              <View>
                <Text style={styles.movieTitle}>{params.title}</Text>
              </View>
              <View>
                <Text style={styles.movieDescription}>{params.synopsis}</Text>
              </View>
              <View>
                <Text style={styles.separator}>Sessões Disponíveis</Text>
              </View>
            </ScrollView>
          </>
        }
        ListFooterComponent={
          !!sessionHour && (
            <>
              {active && user?.isAdmin && (
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <Button
                    text="Editar Sessão"
                    styleProps={{ width: "94%", textAlign: "center" }}
                    onPress={() =>
                      navigation.push("SessionRegister", {
                        session: sessionHour,
                      })
                    }
                  />
                  <Button
                    text="Deletar Sessão"
                    type="secondary"
                    styleProps={{ width: "94%", textAlign: "center" }}
                    onPress={() => onPressButtonDeleteSession()}
                  />
                </View>
              )}
              <View style={styles.ticketsContainer}>
                <Text style={styles.separator}>Entradas Disponíveis</Text>
                <Text style={styles.label}>Inteira</Text>
                <Picker
                  onChanged={handleRegularTicketChange}
                  options={regularTicketOptions}
                  value={tickets[0]}
                  style={styles.picker}
                />
                <Text style={styles.label}>Meia</Text>
                <Picker
                  onChanged={handleDiscountedTicketChange}
                  options={discountedTicketOptions}
                  value={tickets[1]}
                  style={styles.picker}
                />
              </View>
              <Button
                text="Salvar"
                disabled={isDisabled()}
                styleProps={{ alignSelf: "center" }}
                onPress={() => {
                  if (!user.isLoggedIn) {
                    navigation.push("Login", { isFromMovieDetails: true });
                  } else {
                    handleSaveTickets();
                  }
                }}
              />
            </>
          )
        }
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={5}
        key={sessions?.map((session) => session.id)}
        data={sessions}
        keyExtractor={(session) => session.id}
        renderItem={({ item, index }) => {
          const text = moment().format("HH:mm", item.date);

          return (
            <TouchableOpacity
              onPress={() => onPressSessionHour(item, index)}
              style={[
                styles.sessionHour,
                {
                  backgroundColor: active === index ? "#d92323a9" : "#d923234e",
                },
              ]}
            >
              <Text style={styles.sessionHourText}>{text}</Text>
            </TouchableOpacity>
          );
        }}
      />
      {user?.isAdmin && (
        <View>
          <Button
            type="edit"
            onPress={() => navigation.push("MovieRegister", params)}
            styleProps={{ bottom: 70 }}
          />
          <Button type="delete" onPress={() => onPressButtonDelete()} />
        </View>
      )}
    </SafeAreaView>
  );
};
