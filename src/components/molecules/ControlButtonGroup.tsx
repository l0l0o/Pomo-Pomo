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
          animatedButtonStyle={[
            styles.mainButtonStyle,
            { backgroundColor: colors[currentMode].taskText },
          ]}
          animatedTextStyle={styles.mainButtonTextStyle}
          style={styles.button}
        />
      ) : (
        <Button
          onPress={onStart}
          label="Start"
          animatedButtonStyle={[
            styles.mainButtonStyle,
            { backgroundColor: colors[currentMode].taskText },
          ]}
          animatedTextStyle={styles.mainButtonTextStyle}
          style={styles.button}
        />
      )}

      <Button
        onPress={onReset}
        label="Reset"
        animatedButtonStyle={[
          styles.resetButtonStyle,
          {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: `${colors[currentMode].taskText}30`,
          },
        ]}
        animatedTextStyle={[
          styles.resetTextStyle,
          { color: colors[currentMode].taskText },
        ]}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginBottom: 10,
  },
  mainButtonStyle: {
    width: "100%",
    borderRadius: 12,
    padding: 15,
    borderColor: "transparent",
  },
  mainButtonTextStyle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  resetButtonStyle: {
    width: "100%",
    borderRadius: 12,
    padding: 15,
  },
  resetTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
