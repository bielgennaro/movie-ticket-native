import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./style";

export const MovieCard = ({ navigation, ...props }) => (
  <TouchableOpacity
    onPress={() => navigation.push("MovieDetails", { ...props })}
    style={styles.cardContainer}
  >
    <View>
      <Image
        style={styles.cardImage}
        source={{
          uri: props.bannerUrl,
        }}
      />
    </View>

    <View style={styles.rateContainer}>
      <Text style={styles.voteText}>{props.rate}</Text>
      <MaterialIcons name="star" color="yellow" />
    </View>

    <View>
      <Text numberOfLines={1} style={styles.textTitle}>
        {props.title}
      </Text>
      <Text style={styles.gender}>{props.gender}</Text>
    </View>
  </TouchableOpacity>
);
