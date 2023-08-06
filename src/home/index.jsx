import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomIcon from "../../components/CustomIcon";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const rate = 4;

export default function index() {
  console.log("aaaaaa");

  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "#cccc",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <View>
          <Image
            style={styles.cardImage}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jenkins_logo.svg/1200px-Jenkins_logo.svg.png",
            }}
          />
        </View>

        <View style={styles.rateContainer}>
          <MaterialIcons name="star" color="yellow" />
          <Text style={styles.voteText}>{rate}</Text>
        </View>

        <Text numberOfLines={1} style={styles.textTitle}>
          Jenkins
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 20,
  },
  rateContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  starIcon: {
    fontSize: 20,
    color: "yellow",
  },
  voteText: {
    fontSize: 14,
    color: "#fff",
  },
  textTitle: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
  },
});
