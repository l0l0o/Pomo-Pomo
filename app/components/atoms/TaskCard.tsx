import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  TextStyle,
} from "react-native";
import { TextDisplay } from "./TextDisplay";
import { Task } from "../../context/TaskContext";
import { colors } from "../../styles/timerStyles";
import { Ionicons } from "@expo/vector-icons";
import { usePomodoro } from "../../context/PomodoroContext";

type TaskCardProps = {
  task: Task;
  onPress: (task: Task) => void;
  isCurrent: boolean;
  animatedStyle?: any;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  isCurrent,
  animatedStyle,
}) => {
  const { isWorkTime } = usePomodoro();
  const currentMode = isWorkTime ? "work" : "break";

  const descriptionStyle: TextStyle = !task.description
    ? { fontStyle: "italic", opacity: 0.7 }
    : {};
  const descriptionText = task.description || "Aucune description";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isCurrent ? styles.cardSelected : null,
        { backgroundColor: colors[currentMode].buttonBg },
      ]}
      onPress={() => onPress(task)}
      activeOpacity={0.7}
    >
      {isCurrent && (
        <View
          style={[
            styles.selectedIndicator,
            { backgroundColor: colors[currentMode].taskText },
          ]}
        />
      )}

      <View style={styles.taskContent}>
        <View style={styles.titleContainer}>
          <TextDisplay
            text={task.title}
            animatedStyle={undefined}
            style={[styles.title, { color: colors[currentMode].taskText }]}
          />
        </View>
        <TextDisplay
          text={descriptionText}
          animatedStyle={undefined}
          style={[
            styles.description,
            descriptionStyle,
            { color: colors[currentMode].taskDescription },
          ]}
        />
      </View>

      <View style={styles.badgeContainer}>
        {task.completed && (
          <View style={styles.completedBadge}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors[currentMode].taskText}
            />
          </View>
        )}
        {isCurrent && (
          <View
            style={[
              styles.currentBadge,
              { backgroundColor: colors[currentMode].taskText },
            ]}
          >
            <TextDisplay
              text="En cours"
              animatedStyle={undefined}
              style={styles.currentText}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    position: "relative",
    flexDirection: "row",
    overflow: "hidden",
  },
  cardSelected: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  selectedIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  taskContent: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 6,
  },
  titleContainer: {
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  badgeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    alignItems: "flex-end",
  },
  completedBadge: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  currentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  currentText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
