import React from "react";
import { View, StyleSheet } from "react-native";
import { TextDisplay } from "../atoms/TextDisplay";
import { timerStyles } from "../../styles/timerStyles";

type PomodoroCounterProps = {
  count: number;
  animatedTextStyle: any;
};

export const PomodoroCounter: React.FC<PomodoroCounterProps> = ({
  count,
  animatedTextStyle,
}) => {
  return (
    <View style={styles.container}>
      <TextDisplay
        text={`${count} ${count > 1 ? "pomodoros" : "pomodoro"}`}
        animatedStyle={animatedTextStyle}
        style={[timerStyles.pomodoroCountText, styles.countText]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginBottom: 20,
  },
  countText: {
    fontSize: 20,
  },
});
