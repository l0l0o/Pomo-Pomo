import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  SafeAreaView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TaskCard } from "../atoms/TaskCard";
import { Task, useTask } from "../../context/TaskContext";
import { TaskForm } from "../atoms/TaskForm";
import { colors, timerStyles } from "../../styles/timerStyles";
import { TextDisplay } from "../atoms/TextDisplay";
import { usePomodoro } from "../../context/PomodoroContext";

export const TaskList: React.FC = () => {
  const { tasks, currentTask, addTask, setCurrentTask } = useTask();

  const { isWorkTime } = usePomodoro();
  const currentMode = isWorkTime ? "work" : "break";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: colors[currentMode].background },
        ]}
      >
        <Animated.View
          style={[
            timerStyles.container,
            {
              backgroundColor: colors[currentMode].background,
              paddingTop: 60,
              paddingBottom: 0,
              paddingHorizontal: 10,
            },
          ]}
        >
          <View style={styles.formWrapper}>
            <TaskForm onSubmit={addTask} />
          </View>

          <View style={styles.listContainer}>
            {tasks.length === 0 ? (
              <View style={styles.emptyContainer}>
                <TextDisplay
                  text="Vous n'avez pas encore de tâches"
                  animatedStyle={undefined}
                  style={[
                    styles.emptyText,
                    { color: colors[currentMode].taskText },
                  ]}
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  formWrapper: {
    width: "100%",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
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
    textAlign: "center",
    fontWeight: "bold",
  },
});
