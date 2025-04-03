import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Animated, AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Durées par défaut en secondes
const DEFAULT_WORK_TIME = 25 * 60;
const DEFAULT_BREAK_TIME = 5 * 60;

// Clés pour AsyncStorage
const WORK_TIME_KEY = "workTime";
const BREAK_TIME_KEY = "breakTime";

type PomodoroContextType = {
  counter: number;
  isRunning: boolean;
  isWorkTime: boolean;
  pomodoroCount: number;
  animationValue: Animated.Value;
  pauseAnimationValue: Animated.Value;
  hasStarted: boolean;
  workTime: number;
  breakTime: number;
  updateTimerSettings: (newWorkTime: number, newBreakTime: number) => void;
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
  formatTime: (seconds: number) => string;
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [counter, setCounter] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationValue = useRef(new Animated.Value(0)).current;
  const pauseAnimationValue = useRef(new Animated.Value(1)).current;
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(workTime);
  const appState = useRef(AppState.currentState);

  // Charger les paramètres de durée depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedWorkTime = await AsyncStorage.getItem(WORK_TIME_KEY);
        const savedBreakTime = await AsyncStorage.getItem(BREAK_TIME_KEY);

        if (savedWorkTime) {
          const parsedWorkTime = parseInt(savedWorkTime, 10);
          setWorkTime(parsedWorkTime);
          if (isWorkTime && !isRunning) {
            setCounter(parsedWorkTime);
            remainingTimeRef.current = parsedWorkTime;
          }
        }

        if (savedBreakTime) {
          const parsedBreakTime = parseInt(savedBreakTime, 10);
          setBreakTime(parsedBreakTime);
          if (!isWorkTime && !isRunning) {
            setCounter(parsedBreakTime);
            remainingTimeRef.current = parsedBreakTime;
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres:", error);
      }
    };

    loadSettings();
  }, []);

  // Fonction pour mettre à jour les durées des timers
  const updateTimerSettings = useCallback(
    async (newWorkTime: number, newBreakTime: number) => {
      try {
        await AsyncStorage.setItem(WORK_TIME_KEY, newWorkTime.toString());
        await AsyncStorage.setItem(BREAK_TIME_KEY, newBreakTime.toString());

        setWorkTime(newWorkTime);
        setBreakTime(newBreakTime);

        // Mettre à jour le compteur si on n'est pas en cours de timer
        if (!isRunning) {
          if (isWorkTime) {
            setCounter(newWorkTime);
            remainingTimeRef.current = newWorkTime;
          } else {
            setCounter(newBreakTime);
            remainingTimeRef.current = newBreakTime;
          }
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des paramètres:", error);
      }
    },
    [isRunning, isWorkTime]
  );

  const startTimer = useCallback((initialValue: number) => {
    // Enregistrer l'heure de départ et la valeur initiale du compteur
    startTimeRef.current = Date.now();
    remainingTimeRef.current = initialValue;

    // Arrêter tout intervalle existant
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Démarrer un nouvel intervalle
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsedSeconds = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        );
        const newCounter = Math.max(
          0,
          remainingTimeRef.current - elapsedSeconds
        );
        setCounter(newCounter);
      }
    }, 1000);
  }, []);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (isRunning) {
        if (
          appState.current === "active" &&
          nextAppState.match(/inactive|background/)
        ) {
          // L'app passe en arrière-plan, on enregistre le temps actuel
          startTimeRef.current = Date.now();
          remainingTimeRef.current = counter;

          // Arrêter l'intervalle car il ne sera pas fiable en arrière-plan
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        } else if (
          nextAppState === "active" &&
          appState.current.match(/inactive|background/)
        ) {
          // L'app revient au premier plan, calculer le temps écoulé
          if (startTimeRef.current !== null) {
            const elapsedSeconds = Math.floor(
              (Date.now() - startTimeRef.current) / 1000
            );
            const newCounter = Math.max(
              0,
              remainingTimeRef.current - elapsedSeconds
            );
            setCounter(newCounter);

            // Redémarrer l'intervalle
            startTimer(newCounter);
          }
        }
      }

      appState.current = nextAppState;
    },
    [counter, isRunning, startTimer]
  );

  // Gérer les changements d'état de l'application (foreground/background)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  // Animer la transition entre les modes
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isWorkTime ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isWorkTime, animationValue]);

  // Animer l'opacité lorsque le timer est en pause
  useEffect(() => {
    if (!isRunning && hasStarted) {
      // Lancer une animation en boucle pour faire varier l'opacité
      Animated.loop(
        Animated.sequence([
          Animated.timing(pauseAnimationValue, {
            toValue: 0.5,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(pauseAnimationValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      // Arrêter l'animation et remettre l'opacité à 1
      pauseAnimationValue.stopAnimation();
      Animated.timing(pauseAnimationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isRunning, hasStarted, pauseAnimationValue]);

  // Gérer la fin du timer
  useEffect(() => {
    if (counter === 0) {
      // Si on passe de break à work, on a terminé un cycle
      if (!isWorkTime) {
        setPomodoroCount((prev) => prev + 1);
      }

      setIsWorkTime(!isWorkTime);
      const newDuration = isWorkTime ? breakTime : workTime;
      setCounter(newDuration);

      if (isRunning) {
        // Si le timer était en cours, démarrer automatiquement le nouveau cycle
        startTimer(newDuration);
      }
    }
  }, [counter, isWorkTime, isRunning, workTime, breakTime]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
    setHasStarted(true);
    startTimer(counter);
  }, [counter, startTimer]);

  const handleStop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    remainingTimeRef.current = counter;
  }, [counter]);

  const handleReset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(false);
    setCounter(isWorkTime ? workTime : breakTime);
    setHasStarted(false);
    startTimeRef.current = null;
    remainingTimeRef.current = isWorkTime ? workTime : breakTime;
  }, [isWorkTime, workTime, breakTime]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  return (
    <PomodoroContext.Provider
      value={{
        counter,
        isRunning,
        isWorkTime,
        pomodoroCount,
        animationValue,
        pauseAnimationValue,
        hasStarted,
        workTime,
        breakTime,
        updateTimerSettings,
        handleStart,
        handleStop,
        handleReset,
        formatTime,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
};
