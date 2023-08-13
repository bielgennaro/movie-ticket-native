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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useCallback, useState } from "react";

export default function MovieDetails({ navigation }) {
  const [sessionHour, setSessionHour] = useState(null);
  const [tickets, setTickets] = useState([0, 0]);
  const [active, setActive] = useState(null);
  const route = useRoute();
  const { params } = route;
  const maxTickets = params.avaiableTickets;
  const discountedTicketOptions = [];
  const regularTicketOptions = [];

  const isDisabled = () => {
    return tickets[0] === 0 && tickets[1] === 0;
  };

  const getTotalTickets = useCallback(() => {
    return tickets.reduce((sum, total) => sum + total, 0);
  }, [tickets]);

  const handleRegularTicketChange = (value) => {
    if (getTotalTickets() + value <= maxTickets) {
      setTickets([value, tickets[1]]);
    }
  };

  const handleDiscountedTicketChange = (value) => {
    const remainingTickets = maxTickets - tickets[0];

    if (value <= remainingTickets) {
      setTickets([tickets[0], value]);
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
    <SafeAreaView
      style={{
        width: "100%",
        alignSelf: "center",
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <StatusBar backgroundColor="#000" />
            <ScrollView
              style={{ width: "100%", alignSelf: "center", padding: 15 }}
            >
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
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "500",
                    left: "50%",
                  }}
                >
                  Detalhes do Filme
                </Text>
              </View>
              <Image
                style={{
                  aspectRatio: 2 / 3,
                  borderRadius: 12,
                  width: "90%",
                  alignSelf: "center",
                }}
                source={{ uri: params.uriImage }}
              />
              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: 24,
                    alignSelf: "center",
                  }}
                >
                  {params.title}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "justify",
                    fontSize: 16,
                  }}
                >
                  {params.description}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    width: "100%",
                    color: "#fff",
                    textAlign: "justify",
                    fontSize: 28,
                    marginTop: 15,
                    borderBottomColor: "#fff",
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                  }}
                >
                  Sessões Disponíveis
                </Text>
              </View>
            </ScrollView>
          </>
        }
        ListFooterComponent={
          !!sessionHour && (
            <>
              <View
                style={{
                  marginVertical: "5%",
                  width: "95%",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    color: "#fff",
                    textAlign: "justify",
                    fontSize: 22,
                    marginTop: 15,
                    borderBottomColor: "#fff",
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                    marginBottom: 12,
                  }}
                >
                  Entradas Disponíveis
                </Text>
                <Text
                  style={{
                    width: "80%",
                    color: "#fff",
                    textAlign: "justify",
                    fontSize: 16,
                    marginTop: 15,
                    borderBottomWidth: 1,
                    paddingBottom: 8,
                  }}
                >
                  Inteira
                </Text>
                <Picker
                  onChanged={handleRegularTicketChange}
                  options={regularTicketOptions}
                  value={tickets[0]}
                  style={{
                    borderWidth: 1,
                    borderColor: "#d923237c",
                    backgroundColor: "#d923234e",
                    borderRadius: 5,
                    marginBottom: 5,
                    color: "#fff",
                    padding: 5,
                  }}
                />
                <Text
                  style={{
                    width: "80%",
                    color: "#fff",
                    textAlign: "justify",
                    fontSize: 16,
                    marginTop: 15,
                    borderBottomWidth: 1,
                    paddingBottom: 8,
                  }}
                >
                  Meia
                </Text>
                <Picker
                  onChanged={handleDiscountedTicketChange}
                  options={discountedTicketOptions}
                  value={tickets[1]}
                  style={{
                    borderWidth: 1,
                    borderColor: "#d923237c",
                    backgroundColor: "#d923234e",
                    borderRadius: 5,
                    marginBottom: 5,
                    color: "#fff",
                    padding: 5,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: "96%",
                  backgroundColor: isDisabled() ? "#d923234e" : "#d92323a9",
                  marginBottom: "5%",
                  alignSelf: "center",
                  borderRadius: 8,
                  marginTop: "2%",
                }}
                disabled={isDisabled()}
              >
                <Text
                  style={{
                    color: isDisabled() ? "#d3d3d3" : "#fff",
                    fontSize: 18,
                    padding: 10,
                    flex: 1,
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  Salvar
                </Text>
              </TouchableOpacity>
            </>
          )
        }
        columnWrapperStyle={{
          width: "96%",
          alignSelf: "center",
        }}
        numColumns={5}
        key={params.sessions.map((value) => value)}
        data={params.sessions}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (active === index) {
                  setActive(null);
                  setSessionHour(null);
                } else {
                  setActive(index);
                  setSessionHour(item);
                }
              }}
              style={{
                backgroundColor: active === index ? "#d92323a9" : "#d923234e",
                padding: 10,
                margin: 5,
                borderRadius: 8,
                borderColor: "#d923237c",
                borderWidth: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
