import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  StyleProp,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { TextDisplay } from "../atoms/TextDisplay";
import { createAnimatedStyles, colors } from "../../styles/timerStyles";
import { usePomodoro } from "../../context/PomodoroContext";

interface CurrentTaskDisplayProps {
  currentTask: {
    id: string;
    title: string;
    description?: string;
  } | null;
  animatedTextStyle?: StyleProp<TextStyle>;
}

export const CurrentTaskDisplay: React.FC<CurrentTaskDisplayProps> = ({
  currentTask,
  animatedTextStyle,
}) => {
  const { isWorkTime } = usePomodoro();
  const currentMode = isWorkTime ? "work" : "break";

  // Fonction pour naviguer vers la liste des tâches
  const navigateToTaskList = () => {
    router.navigate("/tasks");
  };

  if (!currentTask) {
    return (
      <TouchableOpacity
        style={styles.emptyContainer}
        onPress={navigateToTaskList}
      >
        <TextDisplay
          text="Aucune tâche sélectionnée"
          animatedStyle={animatedTextStyle}
          style={[styles.emptyText, { color: colors[currentMode].taskText }]}
        />
        <TextDisplay
          text="Appuyez pour ajouter une tâche"
          animatedStyle={animatedTextStyle}
          style={[
            styles.addText,
            { color: colors[currentMode].taskDescription },
          ]}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToTaskList}>
      <View style={styles.content}>
        <TextDisplay
          text={currentTask.title}
          animatedStyle={animatedTextStyle}
          style={[styles.title, { color: colors[currentMode].taskText }]}
        />
        <TextDisplay
          text={currentTask.description || "Aucune description."}
          animatedStyle={animatedTextStyle}
          style={[
            styles.description,
            { color: colors[currentMode].taskDescription },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  emptyContainer: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  content: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    opacity: 0.9,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  addText: {
    fontSize: 14,
    opacity: 0.9,
    textAlign: "center",
    marginTop: 5,
  },
  resetButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
