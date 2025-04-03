import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  TextStyle,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TimeInput } from "../molecules/TimeInput";
import { usePomodoro } from "../../context/PomodoroContext";
import { colors, timerStyles } from "../../styles/timerStyles";

// Définition des constantes pour les durées minimales
const MIN_DURATION = 5; // 5 secondes minimum

export const SettingsPanel: React.FC = () => {
  const { workTime, breakTime, updateTimerSettings, isWorkTime } =
    usePomodoro();

  const [tempWorkTime, setTempWorkTime] = useState(workTime);
  const [tempBreakTime, setTempBreakTime] = useState(breakTime);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const currentMode = isWorkTime ? "work" : "break";

  // Fonction pour valider que les temps respectent la durée minimale
  const validateTimes = (workTime: number, breakTime: number) => {
    if (workTime < MIN_DURATION) {
      Alert.alert(
        "Durée trop courte",
        `La durée de travail doit être d'au moins ${MIN_DURATION} secondes.`
      );
      return false;
    }
    if (breakTime < MIN_DURATION) {
      Alert.alert(
        "Durée trop courte",
        `La durée de pause doit être d'au moins ${MIN_DURATION} secondes.`
      );
      return false;
    }
    return true;
  };

  const handleWorkTimeChange = (newWorkTime: number) => {
    setTempWorkTime(Math.max(newWorkTime, MIN_DURATION));
  };

  const handleBreakTimeChange = (newBreakTime: number) => {
    setTempBreakTime(Math.max(newBreakTime, MIN_DURATION));
  };

  const handleSave = () => {
    if (validateTimes(tempWorkTime, tempBreakTime)) {
      updateTimerSettings(tempWorkTime, tempBreakTime);
      setShowSaveMessage(true);

      // Cacher le message après 2 secondes
      setTimeout(() => {
        setShowSaveMessage(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    // Durées par défaut en secondes
    const defaultWorkTime = 25 * 60;
    const defaultBreakTime = 5 * 60;

    setTempWorkTime(defaultWorkTime);
    setTempBreakTime(defaultBreakTime);
    updateTimerSettings(defaultWorkTime, defaultBreakTime);

    setShowSaveMessage(true);
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 2000);
  };

  // Style commun pour tous les inputs de temps
  const commonInputStyle: TextStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    color: colors[currentMode].taskText,
  };

  // Style spécifique pour les minutes
  const minutesInputStyle: TextStyle = {
    ...commonInputStyle,
    fontWeight: "bold",
    fontSize: 28, // Légèrement plus grand pour se démarquer
  };

  // Style pour le séparateur
  const separatorStyle: TextStyle = {
    color: colors[currentMode].taskText,
    fontWeight: "bold",
    fontSize: 36,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: colors[currentMode].background },
        ]}
      >
        <Animated.View
          style={[
            timerStyles.container,
            {
              backgroundColor: colors[currentMode].background,
              paddingTop: 50,
              paddingBottom: 0,
              paddingHorizontal: 0,
            },
          ]}
        >
          <View style={styles.settingsWrapper}>
            <TimeInput
              label="Durée du travail"
              totalSeconds={tempWorkTime}
              onChange={handleWorkTimeChange}
              labelStyle={{ color: colors[currentMode].time }}
              inputContainerStyle={styles.timeInputContainer}
              customStyles={{
                inputStyle: commonInputStyle,
                minutesInputStyle: minutesInputStyle,
                separatorStyle: separatorStyle,
                buttonStyle: {
                  backgroundColor: colors[currentMode].buttonBg,
                },
                buttonTextStyle: {
                  color: colors[currentMode].buttonText,
                },
              }}
              minSeconds={MIN_DURATION}
            />

            <TimeInput
              label="Durée de la pause"
              totalSeconds={tempBreakTime}
              onChange={handleBreakTimeChange}
              labelStyle={{ color: colors[currentMode].time }}
              inputContainerStyle={styles.timeInputContainer}
              customStyles={{
                inputStyle: commonInputStyle,
                minutesInputStyle: minutesInputStyle,
                separatorStyle: separatorStyle,
                buttonStyle: {
                  backgroundColor: colors[currentMode].buttonBg,
                },
                buttonTextStyle: {
                  color: colors[currentMode].buttonText,
                },
              }}
              minSeconds={MIN_DURATION}
            />

            <View
              style={[
                timerStyles.buttonContainer,
                styles.buttonContainerAdjust,
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.mainButton,
                  { backgroundColor: colors[currentMode].taskText },
                ]}
                onPress={handleSave}
              >
                <Text style={[styles.mainButtonText, { color: "#FFFFFF" }]}>
                  Enregistrer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.resetButton,
                  {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                ]}
                onPress={handleReset}
              >
                <Text
                  style={[
                    styles.resetButtonText,
                    { color: colors[currentMode].taskText },
                  ]}
                >
                  Réinitialiser
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.messageContainer}>
              {showSaveMessage && (
                <Text
                  style={[
                    styles.saveMessage,
                    { color: colors[currentMode].taskText },
                  ]}
                >
                  Paramètres sauvegardés !
                </Text>
              )}
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  settingsWrapper: {
    width: "100%",
    paddingHorizontal: 20,
  },
  timeInputContainer: {
    marginBottom: 25,
  },
  buttonContainerAdjust: {
    marginTop: 15,
    marginBottom: 10,
  },
  mainButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButton: {
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageContainer: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  saveMessage: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
