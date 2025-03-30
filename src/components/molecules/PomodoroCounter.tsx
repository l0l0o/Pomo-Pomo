import React from "react";
import { View } from "react-native";
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
    <View style={timerStyles.pomodoroCountContainer}>
      <TextDisplay
        text={`${count} ${count > 1 ? "pomodoros" : "pomodoro"}`}
        animatedStyle={animatedTextStyle}
        style={timerStyles.pomodoroCountText}
      />
    </View>
  );
};
