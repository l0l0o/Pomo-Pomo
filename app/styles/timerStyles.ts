import { StyleSheet } from "react-native";
import { Animated } from "react-native";

// Définir des couleurs pour faciliter les transitions
export const colors = {
  work: {
    background: "#FFA4AF",
    text: "#FFCCD2",
    time: "#783C43",
    buttonBg: "#FFCCD2",
    buttonText: "#783C43",
    countText: "#783C43",
    taskText: "#783C43",
    taskDescription: "#8A4B53",
  },
  break: {
    background: "#A8D8AD",
    text: "#D8F2DB",
    time: "#2F4A33",
    buttonBg: "#D8F2DB",
    buttonText: "#2F4A33",
    countText: "#2F4A33",
    taskText: "#2F4A33",
    taskDescription: "#3D5E42",
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
    paddingVertical: 50,
    paddingHorizontal: 10,
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
    animatedTaskText: {
      color: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.work.taskText, colors.break.taskText],
      }),
    },
    animatedTaskDescription: {
      color: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [
          colors.work.taskDescription,
          colors.break.taskDescription,
        ],
      }),
    },
  };
};
