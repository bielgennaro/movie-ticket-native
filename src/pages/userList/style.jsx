import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#fff",
  },
  viewContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  userItem: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: "80%",
    alignSelf: "center",
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    color: "#fff",
  },
  userList: {
    width: "100%",
  },
});
