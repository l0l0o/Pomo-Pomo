import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type NumberInputProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  min = 0,
  max = 99,
  step = 1,
  onChange,
  containerStyle,
  inputStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  // Formater la valeur pour toujours avoir deux chiffres
  const formatValue = (val: number) => val.toString().padStart(2, "0");

  const [inputValue, setInputValue] = useState(formatValue(value));

  useEffect(() => {
    setInputValue(formatValue(value));
  }, [value]);

  const handleInputChange = (text: string) => {
    // Autoriser uniquement les chiffres
    const numericValue = text.replace(/[^0-9]/g, "");
    setInputValue(numericValue);

    // Convertir en nombre si valide
    if (numericValue) {
      const newValue = parseInt(numericValue, 10);
      if (newValue >= min && newValue <= max) {
        onChange(newValue);
      }
    }
  };

  const handleBlur = () => {
    // Validation et correction lors de la perte de focus
    if (inputValue === "") {
      setInputValue(formatValue(min));
      onChange(min);
    } else {
      let newValue = parseInt(inputValue, 10);
      if (isNaN(newValue)) {
        newValue = min;
      } else if (newValue < min) {
        newValue = min;
      } else if (newValue > max) {
        newValue = max;
      }
      setInputValue(formatValue(newValue));
      onChange(newValue);
    }
  };

  const increment = () => {
    const newValue = Math.min(value + step, max);
    setInputValue(formatValue(newValue));
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    setInputValue(formatValue(newValue));
    onChange(newValue);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.button, buttonStyle]}
          onPress={increment}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} style={buttonTextStyle} />
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, inputStyle]}
            value={inputValue}
            onChangeText={handleInputChange}
            onBlur={handleBlur}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, buttonStyle]}
          onPress={decrement}
          activeOpacity={0.7}
        >
          <Ionicons name="remove" size={24} style={buttonTextStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    height: 160,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  inputWrapper: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 28,
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
    height: "100%",
    padding: 0,
    borderRadius: 5,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 45,
  },
});
