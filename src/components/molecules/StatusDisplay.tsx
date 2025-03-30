import React from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { TextDisplay } from "../atoms/TextDisplay";
import { TimeDisplay } from "../atoms/TimeDisplay";

type StatusDisplayProps = {
  isWorkTime: boolean;
  timeString: string;
  animatedTextStyle: any;
  animatedTimeStyle: any;
  containerStyle?: StyleProp<ViewStyle>;
  pauseAnimatedStyle?: any;
};

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
  isWorkTime,
  timeString,
  animatedTextStyle,
  animatedTimeStyle,
  containerStyle,
  pauseAnimatedStyle,
}) => {
  // Combinaison des styles animés
  const combinedTimeStyle = pauseAnimatedStyle
    ? {
        ...animatedTimeStyle,
        opacity: pauseAnimatedStyle.opacity,
      }
    : animatedTimeStyle;

  return (
    <View style={[styles.container, containerStyle]}>
      <TextDisplay
        text={isWorkTime ? "Let's work !" : "Break time !"}
        animatedStyle={animatedTextStyle}
      />
      <View style={styles.timeContainer}>
        <TimeDisplay time={timeString} animatedStyle={combinedTimeStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  timeContainer: {
    marginTop: -20,
  },
});
