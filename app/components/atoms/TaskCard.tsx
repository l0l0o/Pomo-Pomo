import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  TextStyle,
  Text,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { TextDisplay } from "./TextDisplay";
import { Task, useTask } from "../../context/TaskContext";
import { colors } from "../../styles/timerStyles";
import { Ionicons } from "@expo/vector-icons";
import { usePomodoro } from "../../context/PomodoroContext";
import { TaskEditModal } from "./TaskEditModal";

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
  const { toggleTaskCompletion, deleteTask } = useTask();
  const currentMode = isWorkTime ? "work" : "break";
  const swipeableRef = useRef<Swipeable>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const descriptionStyle: TextStyle = !task.description
    ? { fontStyle: "italic", opacity: 0.7 }
    : {};
  const descriptionText = task.description || "Aucune description";

  // Fonction pour fermer le swipeable après une action
  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  // Fonction pour gérer la suppression d'une tâche
  const handleDelete = () => {
    closeSwipeable();
    deleteTask(task.id);
  };

  // Fonction pour gérer la modification d'une tâche
  const handleEdit = () => {
    closeSwipeable();
    setIsEditModalVisible(true);
  };

  // Fonction pour gérer la complétion d'une tâche
  const handleToggleComplete = () => {
    closeSwipeable();
    toggleTaskCompletion(task.id);
  };

  // Fermer le modal d'édition
  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  // Boutons d'action à droite (suppression)
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 0],
    });

    // Animation de l'opacité pour une transition plus fluide
    const opacity = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.3, 1],
    });

    return (
      <View style={styles.rightActions}>
        <Animated.View
          style={[
            styles.actionContainer,
            {
              transform: [{ translateX: trans }],
              opacity,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Supprimer</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  // Boutons d'action à gauche (édition et complétion)
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-128, 0],
    });

    // Animation de l'opacité pour une transition plus fluide
    const opacity = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.3, 1],
    });

    return (
      <View style={styles.leftActions}>
        <Animated.View
          style={[
            styles.actionContainer,
            {
              transform: [{ translateX: trans }],
              opacity,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: colors[currentMode].taskText },
            ]}
            onPress={handleEdit}
          >
            <Ionicons name="pencil-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Modifier</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.actionContainer,
            {
              transform: [{ translateX: trans }],
              opacity,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: task.completed ? "#FF9500" : "#4DB6AC",
              },
            ]}
            onPress={handleToggleComplete}
          >
            <Ionicons
              name={task.completed ? "arrow-undo-outline" : "checkmark-outline"}
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.actionText}>
              {task.completed ? "Annuler" : "Terminer"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        overshootLeft={false}
        overshootRight={false}
        containerStyle={styles.swipeableContainer}
      >
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
      </Swipeable>

      <TaskEditModal
        visible={isEditModalVisible}
        task={task}
        onClose={handleCloseEditModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  swipeableContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  card: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 0,
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
  leftActions: {
    flexDirection: "row",
    alignItems: "stretch",
    height: "100%",
    paddingRight: 8,
    gap: 5,
  },
  rightActions: {
    alignItems: "stretch",
    justifyContent: "flex-end",
    flexDirection: "row",
    height: "100%",
    paddingLeft: 8,
  },
  actionContainer: {
    height: "100%",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  actionButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  actionText: {
    fontWeight: "600",
    fontSize: 12,
    marginTop: 3,
    color: "#FFFFFF",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  editButton: {
    backgroundColor: "#4DB6AC",
    borderWidth: 0,
  },
  completeButton: {
    backgroundColor: colors.work.taskText,
    borderWidth: 0,
  },
  undoButton: {
    backgroundColor: "#FF9500",
    borderWidth: 0,
  },
});
