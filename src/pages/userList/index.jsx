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
    const fetchUsers = async () => {
      try {
        const dummyUsers = [
          { id: 1, name: "Usuário 1", email: "usuario1@email.com" },
          { id: 2, name: "Usuário 2", email: "usuario2@email.com" },
        ];
        setUsers(dummyUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    console.log("Detalhar usuário com ID:", userId);
  };

  const handleDelete = (userId) => {
    console.log("Editar usuário com ID:", userId);
  };

  const renderUserItem = ({ item }) => (
    <View
      style={styles.userItem}
      onPress={() => handleEdit(item.id)}
      onLongPress={() => handleDelete(item.id)}
    >
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <View style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <Button text="Editar" onPress={() => handleEdit(item.id)} />
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
      <Button type="new" />
    </SafeAreaView>
  );
};

export default UserList;
