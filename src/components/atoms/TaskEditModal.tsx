import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Task, useTask } from "../../context/TaskContext";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/timerStyles";
import { usePomodoro } from "../../context/PomodoroContext";

type TaskEditModalProps = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
};

export const TaskEditModal: React.FC<TaskEditModalProps> = ({
  visible,
  task,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { updateTask } = useTask();
  const { isWorkTime } = usePomodoro();
  const currentMode = isWorkTime ? "work" : "break";

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = async () => {
    if (task && title.trim()) {
      await updateTask(task.id, {
        title: title.trim(),
        description: description.trim(),
      });
      onClose();
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Empêcher la fermeture du modal lors du clic à l'intérieur du contenu
  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  if (!task) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={stopPropagation}>
              <View
                style={[
                  styles.modalContent,
                  { backgroundColor: colors[currentMode].buttonBg },
                ]}
              >
                <View style={styles.header}>
                  <Text
                    style={[
                      styles.modalTitle,
                      { color: colors[currentMode].taskText },
                    ]}
                  >
                    Modifier la tâche
                  </Text>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={colors[currentMode].taskText}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: colors[currentMode].taskText,
                        backgroundColor: `${colors[currentMode].background}50`,
                      },
                    ]}
                    placeholder="Titre de la tâche"
                    placeholderTextColor={`${colors[currentMode].taskDescription}80`}
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>

                <View>
                  <TextInput
                    style={[
                      styles.input,
                      styles.descriptionInput,
                      {
                        color: colors[currentMode].taskText,
                        backgroundColor: `${colors[currentMode].background}50`,
                      },
                    ]}
                    placeholder="Description (optionnelle)"
                    placeholderTextColor={`${colors[currentMode].taskDescription}80`}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.cancelButton,
                      { borderColor: `${colors[currentMode].taskText}30` },
                    ]}
                    onPress={onClose}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: colors[currentMode].taskText },
                      ]}
                    >
                      Annuler
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.saveButton,
                      !title.trim() && styles.disabledButton,
                      {
                        backgroundColor: colors[currentMode].taskText,
                        opacity: !title.trim() ? 0.6 : 1,
                      },
                    ]}
                    onPress={handleSave}
                    disabled={!title.trim()}
                  >
                    <Text style={styles.buttonText}>Enregistrer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
  },
  input: {
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  descriptionInput: {
    minHeight: 120,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  saveButton: {
    borderColor: "transparent",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
