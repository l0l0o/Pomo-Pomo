import React from "react";
import { View, StyleSheet } from "react-native";
import { TaskList } from "../organisms/TaskList";

export const TaskTemplate: React.FC = () => {
  return (
    <View style={styles.container}>
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
