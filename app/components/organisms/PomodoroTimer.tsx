import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { PomodoroCounter } from "../molecules/PomodoroCounter";
import { StatusDisplay } from "../molecules/StatusDisplay";
import { ControlButtonGroup } from "../molecules/ControlButtonGroup";
import { usePomodoro } from "../../context/PomodoroContext";
import { timerStyles, createAnimatedStyles } from "../../styles/timerStyles";
import { TextDisplay } from "../atoms/TextDisplay";
import { useTask } from "../../context/TaskContext";
import { CurrentTaskDisplay } from "../molecules/CurrentTaskDisplay";

export const PomodoroTimer: React.FC = () => {
  const {
    counter,
    isRunning,
    isWorkTime,
    pomodoroCount,
    animationValue,
    pauseAnimationValue,
    hasStarted,
    handleStart,
    handleStop,
    handleReset,
    formatTime,
  } = usePomodoro();

  const { currentTask } = useTask();

  const animatedStyles = createAnimatedStyles(animationValue);

  // Style pour l'animation de pause, seulement si le timer a déjà été lancé
  const pauseAnimatedStyle = hasStarted
    ? {
        opacity: pauseAnimationValue,
      }
    : undefined;

  return (
    <Animated.View
      style={[timerStyles.container, animatedStyles.animatedContainer]}
    >
      <PomodoroCounter
        count={pomodoroCount}
        animatedTextStyle={animatedStyles.animatedCountText}
      />

      <StatusDisplay
        isWorkTime={isWorkTime}
        timeString={formatTime(counter)}
        animatedTextStyle={animatedStyles.animatedText}
        animatedTimeStyle={animatedStyles.animatedTime}
        pauseAnimatedStyle={pauseAnimatedStyle}
      />

      <ControlButtonGroup
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        animatedButtonStyle={animatedStyles.animatedButton}
        animatedTextStyle={animatedStyles.animatedButtonText}
      />

      <CurrentTaskDisplay
        currentTask={currentTask}
        animatedTextStyle={animatedStyles.animatedText}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  border: {
    borderWidth: 1,
    borderColor: "rgb(192, 123, 132)",
    backgroundColor: "rgb(192, 123, 132)",
    borderRadius: 5,
    width: "100%",
    height: 200,
    marginTop: 20,
  },
});
