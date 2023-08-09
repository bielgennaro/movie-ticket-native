import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function MovieDetails({ navigation }) {
  return (
    <SafeAreaView
      style={{
        width: "100%",
        alignSelf: "center",
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <StatusBar hidden />
      <ScrollView style={{ width: "100%", alignSelf: "center", padding: 15 }}>
        <View
          style={{
            backgroundColor: "#d9232a",
            paddingVertical: 15,
            paddingHorizontal: 15,
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color="#fff" size={23} />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
            Detalhes do Filme
          </Text>
        </View>
        <View>
          <Text style={{ color: "#fff" }}>Movie Details Screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
