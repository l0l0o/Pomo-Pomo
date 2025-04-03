import React from "react";
import { Animated, StyleProp, TextStyle, View } from "react-native";
import { timerStyles } from "../../styles/timerStyles";

type TimeDisplayProps = {
  time: string;
  animatedStyle: StyleProp<TextStyle>;
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  time,
  animatedStyle,
}) => {
  // Séparer minutes et secondes
  const [minutes, seconds] = time.split(":");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        alignSelf: "center",
      }}
    >
      <Animated.Text
        style={[
          timerStyles.time,
          animatedStyle,
          { fontWeight: "bold", fontSize: 130 },
        ]}
      >
        {minutes}
      </Animated.Text>
      <Animated.Text
        style={[
          timerStyles.time,
          animatedStyle,
          { fontSize: 78, marginBottom: 12 },
        ]}
      >
        {seconds}
      </Animated.Text>
    </View>
  );
};
