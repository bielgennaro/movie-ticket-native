import { SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MaterialIcons name={"account-circle"} size={100} color={"#fff"} />
        <TextInput placeholder="Email" style={styles.textInput} />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
          style={styles.textInput}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  textInput: {
    backgroundColor: "#fff",
  },
});
