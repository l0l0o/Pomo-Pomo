import { StyleSheet } from "react-native";
import { Animated } from "react-native";

// Définir des couleurs pour faciliter les transitions
export const colors = {
  work: {
    background: "#FFA4AF",
    text: "#FFCCD2",
    time: "#C07B84",
    buttonBg: "#FFCCD2",
    buttonText: "#C07B84",
    countText: "#C07B84",
  },
  break: {
    background: "#A8D8AD",
    text: "#D8F2DB",
    time: "#5E9367",
    buttonBg: "#D8F2DB",
    buttonText: "#5E9367",
    countText: "#5E9367",
  },
};

// Styles statiques
export const timerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 50,
  },
  pomodoroCountContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  pomodoroCountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  button: {
    padding: 0,
    width: "100%",
    marginBottom: 10,
  },

  // Styles de base pour la rétrocompatibilité
  text: {
    fontSize: 36,
    fontWeight: "bold",
  },
  time: {
    fontSize: 100,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

// Fonction pour créer des styles animés
export const createAnimatedStyles = (animation: Animated.Value) => {
  return {
    animatedContainer: {
      backgroundColor: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.work.background, colors.break.background],
      }),
    },
    animatedText: {
      color: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.work.text, colors.break.text],
      }),
    },
    animatedTime: {
      color: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.work.time, colors.break.time],
      }),
    },
    animatedButton: {
      backgroundColor: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.work.buttonBg, colors.break.buttonBg],
      }),
    },
    animatedButtonText: {
      color: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.work.buttonText, colors.break.buttonText],
      }),
    },
    animatedCountText: {
      color: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.work.countText, colors.break.countText],
      }),
    },
  };
};
