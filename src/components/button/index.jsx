import { Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Button = ({ text, type = "primary", onPress }) => {
  const types = {
    primary: styles.button,
    secondary: styles.buttonSecondary,
    edit: styles.newMovieButton,
    new: styles.newMovieButton,
  };

  if (type === "primary" || type === "secondary") {
    return (
      <TouchableOpacity style={types[type]} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }

  if (type === "new") {
    return (
      <TouchableOpacity style={styles.newMovieButton} onPress={onPress}>
        <MaterialIcons name="add" color="white" size={20} />
      </TouchableOpacity>
    );
  }

  if (type === "edit") {
    return (
      <TouchableOpacity style={styles.newMovieButton} onPress={onPress}>
        <MaterialIcons name="edit" color="white" size={20} />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#d9232a",
    width: "40%",
    alignItems: "center",
    borderRadius: 6,
    padding: 10,
  },
  buttonSecondary: {
    backgroundColor: "#000",
    width: "40%",
    alignItems: "center",
    borderRadius: 6,
    padding: 10,
    borderColor: "#d9232a",
    borderWidth: 1,
  },
  text: {
    color: "#fff",
  },
  newMovieButton: {
    backgroundColor: "#d9232a",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    bottom: 10,
    right: 8,
  },
});
