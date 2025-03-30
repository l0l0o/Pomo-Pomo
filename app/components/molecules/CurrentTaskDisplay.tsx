import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextDisplay } from "../atoms/TextDisplay";
import { Task } from "../../context/TaskContext";
import { colors } from "../../styles/timerStyles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type CurrentTaskDisplayProps = {
  currentTask: Task | null;
  animatedTextStyle: any;
};

export const CurrentTaskDisplay: React.FC<CurrentTaskDisplayProps> = ({
  currentTask,
  animatedTextStyle,
}) => {
  const router = useRouter();

  const navigateToTasks = () => {
    router.push("/tasks");
  };

  if (!currentTask) {
    return (
      <View style={styles.containerEmpty}>
        <TextDisplay
          text="Aucune tâche sélectionnée"
          animatedStyle={animatedTextStyle}
          style={styles.noTaskText}
        />
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={navigateToTasks}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />
          <TextDisplay
            text="Ajouter une tâche"
            animatedStyle={undefined}
            style={styles.addTaskText}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // Préparer le texte de description ou utiliser un texte par défaut
  const descriptionText = currentTask.description?.trim()
    ? currentTask.description
    : "Aucune description";

  // Style pour le texte par défaut (italique et légèrement transparent)
  const descriptionStyle = !currentTask.description?.trim()
    ? styles.noDescriptionText
    : {};

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextDisplay
          text={currentTask.title}
          animatedStyle={undefined}
          style={styles.taskTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        />
      </View>

      <ScrollView
        style={styles.descriptionScrollView}
        showsVerticalScrollIndicator={true}
      >
        <TextDisplay
          text={descriptionText}
          animatedStyle={undefined}
          style={[styles.taskDescription, descriptionStyle]}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 16,
    borderRadius: 8,
    marginBottom: 40,
    marginTop: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    maxHeight: 200,
    overflow: "hidden",
  },
  containerEmpty: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 16,
    borderRadius: 8,
    marginBottom: 40,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    paddingBottom: 8,
    marginBottom: 8,
  },
  noTaskText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  descriptionScrollView: {
    maxHeight: 140,
  },
  taskDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    paddingBottom: 10,
  },
  noDescriptionText: {
    fontStyle: "italic",
    opacity: 0.7,
  },
  addTaskButton: {
    flexDirection: "row",
    backgroundColor: colors.work.time,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  addTaskText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
