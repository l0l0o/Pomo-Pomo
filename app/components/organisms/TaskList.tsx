import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  SafeAreaView,
} from "react-native";
import { TaskCard } from "../atoms/TaskCard";
import { Task, useTask } from "../../context/TaskContext";
import { TaskForm } from "../atoms/TaskForm";
import { colors } from "../../styles/timerStyles";
import { TextDisplay } from "../atoms/TextDisplay";

export const TaskList: React.FC = () => {
  const {
    tasks,
    currentTask,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    setCurrentTask,
  } = useTask();

  const handleTaskPress = (task: Task) => {
    if (currentTask && currentTask.id === task.id) {
      // Désélectionner la tâche si elle est déjà sélectionnée
      setCurrentTask(null);
    } else {
      // Sélectionner une nouvelle tâche
      setCurrentTask(task);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container]}>
        <TaskForm onSubmit={addTask} />

        <View style={styles.listContainer}>
          {tasks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <TextDisplay
                text="Vous n'avez pas encore de tâches"
                animatedStyle={undefined}
                style={styles.emptyText}
              />
            </View>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onPress={handleTaskPress}
                  isCurrent={currentTask ? currentTask.id === item.id : false}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.work.time,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 0,
    backgroundColor: colors.work.time,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.work.buttonBg,
    textAlign: "center",
  },
});
