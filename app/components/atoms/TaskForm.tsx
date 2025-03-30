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
        style={styles.input}
        placeholder="Titre de la tâche"
        placeholderTextColor={colors.work.buttonText}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description (optionnelle)"
        placeholderTextColor={colors.work.buttonText}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.7}
      >
        <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
        <TextDisplay
          text="Ajouter la tâche"
          animatedStyle={undefined}
          style={styles.submitButtonText}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.work.buttonBg,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.work.buttonText,
    marginBottom: 12,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: colors.work.time,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.work.buttonBg,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
