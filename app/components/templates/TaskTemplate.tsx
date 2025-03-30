import React from "react";
import { View, StyleSheet } from "react-native";
import { TaskList } from "../organisms/TaskList";
import { usePomodoro } from "../../context/PomodoroContext";
import { colors } from "../../styles/timerStyles";

export const TaskTemplate: React.FC = () => {
  const { isWorkTime } = usePomodoro();
  const currentMode = isWorkTime ? "work" : "break";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[currentMode].background },
      ]}
    >
      <TaskList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
