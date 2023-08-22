import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { data } from "../../helper/data";
import { MovieCard } from "../../components/movieCard";
import { styles } from "./style";
import { Button } from "../../components/button";
import UserContext from "../../context";

export default function Home({ navigation }) {
  const user = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
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
}
