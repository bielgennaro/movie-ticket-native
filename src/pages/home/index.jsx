import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { data } from "../../helper/data";
import { MovieCard } from "../../components/movieCard";
import { styles } from "./style";
import { Button } from "../../components/button";

export default function Home({ navigation }) {
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
      <Button onPress={() => navigation.push("MovieRegister")} type="new" />
    </SafeAreaView>
  );
}
