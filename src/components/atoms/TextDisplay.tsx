import React from "react";
import { Animated, StyleProp, TextStyle } from "react-native";
import { timerStyles } from "../../styles/timerStyles";

type TextDisplayProps = {
  text: string;
  animatedStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
};

export const TextDisplay: React.FC<TextDisplayProps> = ({
  text,
  animatedStyle,
  style = timerStyles.text,
  numberOfLines,
  ellipsizeMode,
}) => {
  return (
    <Animated.Text
      style={[style, animatedStyle]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {text}
    </Animated.Text>
  );
};
