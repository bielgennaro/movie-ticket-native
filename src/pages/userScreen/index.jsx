import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./style";
import ToastManager, { Toast } from "toastify-react-native";
import { Header } from "../../components/header";
import { Button } from "../../components/button";
import UserContext from "../../context";
import moment from "moment";

export const UserTickets = ({ navigation }) => {
  const [userTickets, setUserTickets] = useState([]);
  const userContext = useContext(UserContext);

  const showToasts = (message, type) => {
    if (type === "success") {
      Toast.success(message);
    }

    if (type === "error") {
      Toast.error(message);
    }
  };

  const onPressDeleteTicket = (ticketId) => {
    fetch(
      `https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/tickets/delete/${ticketId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          Toast.success("Ingresso excluído com sucesso!");
          navigation.push("Tab");
        } else {
          Toast.error("Não foi possível excluir o Ingresso!");
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.error("Erro ao excluir o Ingresso!");
      });
  };

  useEffect(() => {
    const fetchTickets = () => {
      fetch(
        `https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/tickets/user/${userContext.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          const res = await response.json();

          if (response.ok) {
            console.log(res);
            setUserTickets(res);
          } else {
            Toast.error("Não foi possível carregar os Ingressos!");
          }
        })
        .catch((error) => Toast.error("Erro ao carregar os Ingressos!"));
    };

    fetchTickets();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.viewContainer}>
        <ToastManager />
        <Text style={styles.title}>Meus Ingressos</Text>
        {userTickets.map((ticket, index) => (
          <View key={index} style={styles.ticketCard}>
            <Text style={styles.ticketText}>
              Data: {moment().format("HH:mm", ticket.sessionDateTime)}
            </Text>
            <View
              style={{ marginTop: 5, marginRight: 0, display: "flex", gap: 10 }}
            >
              <Button
                text="Deletar"
                type="secondary"
                onPress={() => onPressDeleteTicket(ticket.id)}
              />
            </View>
          </View>
        ))}
        {userTickets.length === 0 && (
          <Text style={styles.noTicketsText}>Nenhum ingresso encontrado.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
