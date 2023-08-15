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
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useCallback, useState } from "react";
import { Header } from "../../components/header";
import { styles } from "./style";

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

  const onPressSessionHour = (item, index) => {
    if (active === index) {
      setActive(null);
      setSessionHour(null);
    } else {
      setActive(index);
      setSessionHour(item);
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
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <StatusBar backgroundColor="#000" />
            <ScrollView style={styles.scrollView}>
              <Header
                onPress={() => navigation.goBack()}
                title="Detalhes do Filme"
              />
              <Image
                style={styles.screenImage}
                source={{ uri: params.uriImage }}
              />
              <View>
                <Text style={styles.movieTitle}>{params.title}</Text>
              </View>
              <View>
                <Text style={styles.movieDescription}>
                  {params.description}
                </Text>
              </View>
              <View>
                <Text style={styles.separator}>Sessões Disponíveis</Text>
              </View>
            </ScrollView>
          </>
        }
        ListFooterComponent={
          !!sessionHour && (
            <>
              <View style={styles.ticketsContainer}>
                <Text style={styles.separator}>Entradas Disponíveis</Text>
                <Text style={styles.label}>Inteira</Text>
                <Picker
                  onChanged={handleRegularTicketChange}
                  options={regularTicketOptions}
                  value={tickets[0]}
                  style={styles.picker}
                />
                <Text style={styles.label}>Meia</Text>
                <Picker
                  onChanged={handleDiscountedTicketChange}
                  options={discountedTicketOptions}
                  value={tickets[1]}
                  style={styles.picker}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.buttonSave,
                  { backgroundColor: isDisabled() ? "#d923234e" : "#d92323a9" },
                ]}
                disabled={isDisabled()}
              >
                <Text
                  style={[
                    styles.buttonSaveText,
                    { color: isDisabled() ? "#d3d3d3" : "#fff" },
                  ]}
                >
                  Salvar
                </Text>
              </TouchableOpacity>
            </>
          )
        }
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={5}
        key={params.sessions.map((value) => value)}
        data={params.sessions}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => onPressSessionHour(item, index)}
              style={[
                styles.sessionHour,
                {
                  backgroundColor: active === index ? "#d92323a9" : "#d923234e",
                },
              ]}
            >
              <Text style={styles.sessionHourText}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
