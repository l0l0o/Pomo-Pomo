import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { Animated, AppState, AppStateStatus } from "react-native";
import { colors } from "../styles/timerStyles";

// Durées en secondes
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

type PomodoroContextType = {
  counter: number;
  isRunning: boolean;
  isWorkTime: boolean;
  pomodoroCount: number;
  animationValue: Animated.Value;
  pauseAnimationValue: Animated.Value;
  hasStarted: boolean;
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
  const [counter, setCounter] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationValue = useRef(new Animated.Value(0)).current;
  const pauseAnimationValue = useRef(new Animated.Value(1)).current;
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(WORK_TIME);
  const appState = useRef(AppState.currentState);

  // Gérer les changements d'état de l'application (foreground/background)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
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
  };

  // Animer la transition entre les modes
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isWorkTime ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isWorkTime]);

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
  }, [isRunning, hasStarted]);

  // Gérer la fin du timer
  useEffect(() => {
    if (counter === 0) {
      // Si on passe de break à work, on a terminé un cycle
      if (!isWorkTime) {
        setPomodoroCount((prev) => prev + 1);
      }
      setIsWorkTime(!isWorkTime);
      const newDuration = isWorkTime ? BREAK_TIME : WORK_TIME;
      setCounter(newDuration);

      if (isRunning) {
        // Si le timer était en cours, démarrer automatiquement le nouveau cycle
        startTimer(newDuration);
      }
    }
  }, [counter, isWorkTime]);

  const startTimer = (initialValue: number) => {
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
  };

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);
    startTimer(counter);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    remainingTimeRef.current = counter;
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(false);
    setCounter(WORK_TIME);
    setIsWorkTime(true);
    setHasStarted(false);
    startTimeRef.current = null;
    remainingTimeRef.current = WORK_TIME;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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
