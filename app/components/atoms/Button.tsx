import React from "react";
import {
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { timerStyles } from "../../styles/timerStyles";

type ButtonProps = {
  onPress: () => void;
  label: string;
  animatedButtonStyle: StyleProp<ViewStyle>;
  animatedTextStyle: StyleProp<TextStyle>;
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  animatedButtonStyle,
  animatedTextStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={timerStyles.button}>
      <Animated.View
        style={[
          {
            width: "100%",
            padding: 10,
            alignItems: "center",
            borderRadius: 5,
          },
          animatedButtonStyle,
        ]}
      >
        <Animated.Text style={[timerStyles.buttonText, animatedTextStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
