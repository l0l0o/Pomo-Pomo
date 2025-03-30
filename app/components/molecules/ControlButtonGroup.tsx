import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { Button } from "../atoms/Button";
import { timerStyles } from "../../styles/timerStyles";

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
  return (
    <View style={[timerStyles.buttonContainer, containerStyle]}>
      {isRunning ? (
        <Button
          onPress={onStop}
          label="Pause"
          animatedButtonStyle={animatedButtonStyle}
          animatedTextStyle={animatedTextStyle}
        />
      ) : (
        <Button
          onPress={onStart}
          label="Start"
          animatedButtonStyle={animatedButtonStyle}
          animatedTextStyle={animatedTextStyle}
        />
      )}

      <Button
        onPress={onReset}
        label="Reset"
        animatedButtonStyle={animatedButtonStyle}
        animatedTextStyle={animatedTextStyle}
      />
    </View>
  );
};
