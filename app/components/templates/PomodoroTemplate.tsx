import React from "react";
import { View, StyleSheet } from "react-native";
import { PomodoroTimer } from "../organisms/PomodoroTimer";

export const PomodoroTemplate: React.FC = () => {
  return (
    <View style={styles.container}>
      <PomodoroTimer />
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
