import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./style";
import ToastManager, { Toast } from "toastify-react-native";
import { Header } from "../../components/header";
import { Button } from "../../components/button";

export const UserTickets = ({ navigation }) => {
  const [userTickets, setUserTickets] = useState([]);

  const showToasts = (message, type) => {
    if (type === "success") {
      Toast.success(message);
    }

    if (type === "error") {
      Toast.error(message);
    }
  };

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const dummyTickets = [
          { movie: "Filme 1", date: "2023-11-20", time: "18:00", seat: "A1" },
          { movie: "Filme 2", date: "2023-11-22", time: "20:30", seat: "B5" },
        ];

        setUserTickets(dummyTickets);
      } catch (error) {
        showToasts("Erro ao buscar os Ingressos!", "error");
      }
    };

    fetchUserTickets();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.viewContainer}>
        <ToastManager />
        <Text style={styles.title}>Meus Ingressos</Text>
        {userTickets.map((ticket, index) => (
          <View key={index} style={styles.ticketCard}>
            <Text style={styles.ticketText}>Filme: {ticket.movie}</Text>
            <Text style={styles.ticketText}>Data: {ticket.date}</Text>
            <Text style={styles.ticketText}>Horário: {ticket.time}</Text>
            <Text style={styles.ticketText}>Assento: {ticket.seat}</Text>
            <View
              style={{ marginTop: 5, marginRight: 0, display: "flex", gap: 10 }}
            >
              <Button text="Editar" />
              <Button text="Deletar" type="secondary" />
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
