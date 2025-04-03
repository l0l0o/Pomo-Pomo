import React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from "react-native";
import { TextDisplay } from "../atoms/TextDisplay";
import { TimeDisplay } from "../atoms/TimeDisplay";
import { PomodoroCounter } from "../molecules/PomodoroCounter";
import { timerStyles } from "../../styles/timerStyles";

type StatusDisplayProps = {
  isWorkTime: boolean;
  timeString: string;
  animatedTextStyle: any;
  animatedTimeStyle: any;
  containerStyle?: StyleProp<ViewStyle>;
  pauseAnimatedStyle?: any;
  pomodoroCount: number;
  animatedCountTextStyle: any;
};

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
  isWorkTime,
  timeString,
  animatedTextStyle,
  animatedTimeStyle,
  containerStyle,
  pauseAnimatedStyle,
  pomodoroCount,
  animatedCountTextStyle,
}) => {
  // Combinaison des styles animés
  const combinedTimeStyle = pauseAnimatedStyle
    ? {
        ...animatedTimeStyle,
        opacity: pauseAnimatedStyle.opacity,
      }
    : animatedTimeStyle;

  // Style personnalisé pour le texte de statut
  const statusTextStyle: StyleProp<TextStyle> = {
    ...timerStyles.text,
    fontSize: 44,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.alignmentContainer}>
        <PomodoroCounter
          count={pomodoroCount}
          animatedTextStyle={animatedCountTextStyle}
        />
        <TextDisplay
          text={isWorkTime ? "Let's work !" : "Break time !"}
          animatedStyle={animatedTextStyle}
          style={statusTextStyle}
        />
        <View style={styles.timeContainer}>
          <TimeDisplay time={timeString} animatedStyle={combinedTimeStyle} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 0,
  },
  alignmentContainer: {
    alignItems: "center",
    width: "100%",
  },
  timeContainer: {
    marginTop: -20,
    width: "100%",
  },
});
