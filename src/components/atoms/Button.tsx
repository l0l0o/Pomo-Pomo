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
  style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  animatedButtonStyle,
  animatedTextStyle,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[timerStyles.button, style]}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
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
