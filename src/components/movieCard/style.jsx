import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#4444446a",
    borderRadius: 12,
    width: "49%",
    marginTop: "2%",
    padding: 4,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 8,
    width: "80%",
    alignSelf: "center",
  },
  rateContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
  gender: {
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
  },
});
