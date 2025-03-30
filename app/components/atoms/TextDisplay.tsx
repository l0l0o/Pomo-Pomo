import React from "react";
import { Animated, StyleProp, TextStyle } from "react-native";
import { timerStyles } from "../../styles/timerStyles";

type TextDisplayProps = {
  text: string;
  animatedStyle: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
};

export const TextDisplay: React.FC<TextDisplayProps> = ({
  text,
  animatedStyle,
  style = timerStyles.text,
}) => {
  return <Animated.Text style={[style, animatedStyle]}>{text}</Animated.Text>;
};
