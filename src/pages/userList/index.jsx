import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button } from "../../components/button";
import { styles } from "./style";

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      fetch("https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const res = await response.json();

          console.log(res);
          if (response.ok) {
            setData(res);
          } else {
            Toast.error("Não foi possível carregar os Filmes!");
          }
        })
        .catch((error) => Toast.error("Erro ao carregar os Filmes!"));
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    navigation.push("UserRegister", { userId });
  };

  const handleDelete = (userId) => {
    fetch(
      `https://movie-ticket-api-v2-dev-dkrg.3.us-1.fl0.io/users/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          Toast.success("Usuário deletado com sucesso!");
          navigation.push("Tab");
        } else {
          Toast.error("Não foi possível deletar o usuário!");
        }
      })
      .catch((error) => Toast.error("Erro ao deletar o usuário!"));
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <View style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <Button text="Editar" onPress={() => handleEdit(item)} />
        <Button
          text="Deletar"
          type="secondary"
          onPress={() => handleDelete(item.id)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.viewContainer}>
        <Text style={styles.title}>Lista de Usuários</Text>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.userList}
        />
      </View>
      <Button
        type="new"
        onPress={() =>
          navigation.push("UserRegister", { isAdminCreating: true })
        }
      />
    </SafeAreaView>
  );
};

export default UserList;
