import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { NumberInput } from "../atoms/NumberInput";

type CustomStylesType = {
  inputStyle?: StyleProp<TextStyle>;
  minutesInputStyle?: StyleProp<TextStyle>;
  secondsInputStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  separatorStyle?: StyleProp<TextStyle>;
};

type TimeInputProps = {
  label: string;
  totalSeconds: number;
  onChange: (totalSeconds: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  customStyles?: CustomStylesType;
  minSeconds?: number;
};

export const TimeInput: React.FC<TimeInputProps> = ({
  label,
  totalSeconds,
  onChange,
  containerStyle,
  labelStyle,
  inputContainerStyle,
  customStyles = {},
  minSeconds = 0,
}) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const handleMinutesChange = (newMinutes: number) => {
    // Si les minutes changent à 0 et que les secondes sont aussi à 0,
    // on garde le minimum de secondes requis
    if (newMinutes === 0 && seconds < minSeconds) {
      onChange(newMinutes * 60 + minSeconds);
    } else {
      onChange(newMinutes * 60 + seconds);
    }
  };

  const handleSecondsChange = (newSeconds: number) => {
    // Si on est à 0 minutes et que les nouvelles secondes sont inférieures au minimum,
    // on force le minimum
    if (minutes === 0 && newSeconds < minSeconds) {
      onChange(minutes * 60 + minSeconds);
    } else {
      onChange(minutes * 60 + newSeconds);
    }
  };

  // Style pour les minutes (avec le gras)
  const minutesStyle = [
    customStyles.inputStyle,
    customStyles.minutesInputStyle || { fontWeight: "bold" },
  ];

  // Style pour les secondes (sans le gras)
  const secondsStyle = [
    customStyles.inputStyle,
    customStyles.secondsInputStyle || { fontWeight: "normal" },
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={[styles.inputsContainer, inputContainerStyle]}>
        <View style={styles.timeUnit}>
          <NumberInput
            value={minutes}
            min={0}
            max={99}
            onChange={handleMinutesChange}
            containerStyle={styles.inputContainer}
            inputStyle={minutesStyle}
            buttonStyle={customStyles.buttonStyle}
            buttonTextStyle={customStyles.buttonTextStyle}
          />
        </View>

        <View style={styles.separatorContainer}>
          <Text style={[styles.separator, customStyles.separatorStyle]}>:</Text>
        </View>

        <View style={styles.timeUnit}>
          <NumberInput
            value={seconds}
            min={minutes === 0 ? minSeconds : 0}
            max={59}
            onChange={handleSecondsChange}
            containerStyle={styles.inputContainer}
            inputStyle={secondsStyle}
            buttonStyle={customStyles.buttonStyle}
            buttonTextStyle={customStyles.buttonTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 160, // Même hauteur que le NumberInput
  },
  timeUnit: {
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    height: "100%",
  },
  separatorContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    fontSize: 36,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  inputContainer: {
    width: "100%",
    height: "100%",
  },
});
