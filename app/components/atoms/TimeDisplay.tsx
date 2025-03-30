import React from "react";
import { Animated, StyleProp, TextStyle } from "react-native";
import { timerStyles } from "../../styles/timerStyles";

type TimeDisplayProps = {
  time: string;
  animatedStyle: StyleProp<TextStyle>;
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  time,
  animatedStyle,
}) => {
  return (
    <Animated.Text style={[timerStyles.time, animatedStyle]}>
      {time}
    </Animated.Text>
  );
};
