import { StyleSheet } from "react-native";

export const timerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 50,
    backgroundColor: "#FFA4AF",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFCCD2",
  },
  time: {
    fontSize: 76,
    fontWeight: "bold",
    color: "#C07B84",
  },
  button: {
    backgroundColor: "#FFCCD2",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  buttonText: {
    color: "#C07B84",
    fontSize: 24,
    fontWeight: "bold",
  },
});
