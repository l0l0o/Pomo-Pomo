import React from "react";
import { View, StyleSheet } from "react-native";
import { PomodoroTimer } from "../organisms/PomodoroTimer";
import { PomodoroProvider } from "../../context/PomodoroContext";

export const PomodoroTemplate: React.FC = () => {
  return (
    <View style={styles.container}>
      <PomodoroProvider>
        <PomodoroTimer />
      </PomodoroProvider>
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
