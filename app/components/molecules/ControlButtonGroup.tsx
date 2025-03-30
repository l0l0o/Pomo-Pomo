import React from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Button } from "../atoms/Button";
import { timerStyles, colors } from "../../styles/timerStyles";
import { usePomodoro } from "../../context/PomodoroContext";

type ControlButtonGroupProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  animatedButtonStyle: any;
  animatedTextStyle: any;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ControlButtonGroup: React.FC<ControlButtonGroupProps> = ({
  isRunning,
  onStart,
  onStop,
  onReset,
  animatedButtonStyle,
  animatedTextStyle,
  containerStyle,
}) => {
  const { isWorkTime } = usePomodoro();
  const currentMode = isWorkTime ? "work" : "break";

  return (
    <View style={[timerStyles.buttonContainer, containerStyle]}>
      {isRunning ? (
        <Button
          onPress={onStop}
          label="Pause"
          animatedButtonStyle={animatedButtonStyle}
          animatedTextStyle={animatedTextStyle}
          style={styles.mainButtonStyle}
        />
      ) : (
        <Button
          onPress={onStart}
          label="Start"
          animatedButtonStyle={animatedButtonStyle}
          animatedTextStyle={animatedTextStyle}
          style={styles.mainButtonStyle}
        />
      )}

      <Button
        onPress={onReset}
        label="Reset"
        animatedButtonStyle={[
          styles.resetButtonStyle,
          { backgroundColor: `${colors[currentMode].taskText}90` },
        ]}
        animatedTextStyle={styles.resetTextStyle}
        style={styles.resetButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainButtonStyle: {
    width: "100%",
    marginBottom: 10,
  },
  resetButton: {
    width: "100%",
  },
  resetButtonStyle: {
    borderRadius: 8,
  },
  resetTextStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
