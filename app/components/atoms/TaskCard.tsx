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
  const descriptionStyle: TextStyle = !task.description
    ? { fontStyle: "italic", opacity: 0.7 }
    : {};
  const descriptionText = task.description || "Aucune description";

  return (
    <TouchableOpacity
      style={[styles.card, isCurrent ? styles.cardSelected : null]}
      onPress={() => onPress(task)}
      activeOpacity={0.7}
    >
      {isCurrent && <View style={styles.selectedIndicator} />}

      <View style={styles.taskContent}>
        <View style={styles.titleContainer}>
          <TextDisplay
            text={task.title}
            animatedStyle={undefined}
            style={styles.title}
          />
        </View>
        <TextDisplay
          text={descriptionText}
          animatedStyle={undefined}
          style={[styles.description, descriptionStyle]}
        />
      </View>

      <View style={styles.badgeContainer}>
        {task.completed && (
          <View style={styles.completedBadge}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors.work.background}
            />
          </View>
        )}
        {isCurrent && (
          <View style={styles.currentBadge}>
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    position: "relative",
    flexDirection: "row",
    backgroundColor: colors.work.buttonBg,
    borderWidth: 1,
    borderColor: colors.work.background,
    overflow: "hidden",
  },
  cardSelected: {
    borderWidth: 1,
    borderColor: colors.work.background,
    shadowColor: colors.work.background,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  selectedIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.work.background,
  },
  taskContent: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 8,
  },
  titleContainer: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.work.buttonText,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.work.buttonText,
  },
  badgeContainer: {
    position: "absolute",
    top: 12,
    right: 12,
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
    backgroundColor: colors.work.background,
    justifyContent: "center",
    alignItems: "center",
  },
  currentText: {
    color: colors.work.text,
    fontSize: 12,
    fontWeight: "bold",
  },
});
