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

export const MovieDetails = ({ navigation }) => {
  const [sessionHour, setSessionHour] = useState(null);
  const [tickets, setTickets] = useState([0, 0]);
  const [active, setActive] = useState(null);
  const route = useRoute();
  const user = useContext(UserContext);
  const { params } = route;
  const [maxTickets, setMaxTickets] = useState(params.avaiableTickets);
  const discountedTicketOptions = [];
  const regularTicketOptions = [];

  useEffect(() => {
    setMaxTickets(params.avaiableTickets);
  }, [params]);

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
              {active && user.isAdmin && (
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
                  />
                  <Button
                    text="Deletar Sessão"
                    type="secondary"
                    styleProps={{ width: "94%", textAlign: "center" }}
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
                  }
                }}
              />
            </>
          )
        }
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={5}
        key={params.sessions.map((value) => value)}
        data={params.sessions}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
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
              <Text style={styles.sessionHourText}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
      {user.isAdmin && (
        <View>
          <Button
            type="edit"
            onPress={() => navigation.push("MovieRegister", params)}
            styleProps={{ bottom: 70 }}
          />
          <Button
            type="delete"
            onPress={() => navigation.push("MovieRegister", params)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
