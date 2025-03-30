import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { TextDisplay } from "./TextDisplay";
import { colors } from "../../styles/timerStyles";
import { Ionicons } from "@expo/vector-icons";
import { usePomodoro } from "../../context/PomodoroContext";

type TaskFormProps = {
  onSubmit: (title: string, description: string) => void;
  animatedStyle?: any;
};

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  animatedStyle,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isWorkTime } = usePomodoro();
  const currentMode = isWorkTime ? "work" : "break";

  const handleSubmit = () => {
    if (title.trim() !== "") {
      onSubmit(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={[styles.input, { color: colors[currentMode].taskText }]}
        placeholder="Nouvelle tâche..."
        placeholderTextColor={`${colors[currentMode].taskDescription}80`}
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.descriptionRow}>
        <TextInput
          style={[
            styles.input,
            styles.multilineInput,
            { flex: 1, marginBottom: 0, marginRight: 10 },
            { color: colors[currentMode].taskText },
          ]}
          placeholder="Description (optionnelle)"
          placeholderTextColor={`${colors[currentMode].taskDescription}80`}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: colors[currentMode].taskText, height: 80 },
          ]}
          onPress={handleSubmit}
          activeOpacity={0.7}
          disabled={!title.trim()}
        >
          <Ionicons name="add-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "95%",
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  descriptionRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  submitButton: {
    borderRadius: 8,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});
