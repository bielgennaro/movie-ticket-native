import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    width: "100%",
    alignSelf: "center",
    padding: 15,
  },
  screenImage: {
    aspectRatio: 2 / 3,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
  },
  movieTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 24,
    alignSelf: "center",
  },
  movieDescription: {
    color: "#fff",
    textAlign: "justify",
    fontSize: 16,
  },
  separator: {
    width: "100%",
    color: "#fff",
    textAlign: "justify",
    fontSize: 28,
    marginTop: 15,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  ticketsContainer: {
    marginVertical: "5%",
    width: "95%",
    alignSelf: "center",
  },
  label: {
    width: "80%",
    color: "#fff",
    textAlign: "justify",
    fontSize: 16,
    marginTop: 15,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#d923237c",
    backgroundColor: "#d923234e",
    borderRadius: 5,
    marginBottom: 5,
    color: "#fff",
    padding: 5,
  },
  buttonSave: {
    width: "40%",
    marginBottom: "5%",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: "2%",
  },
  buttonSaveText: {
    fontSize: 18,
    padding: 10,
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  columnWrapperStyle: {
    width: "96%",
    alignSelf: "center",
  },
  sessionHour: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderColor: "#d923237c",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  sessionHourText: {
    color: "white",
    fontSize: 16,
  },
});
