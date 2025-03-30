import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { Animated } from "react-native";
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
      setCounter(isWorkTime ? BREAK_TIME : WORK_TIME);
    }
  }, [counter, isWorkTime]);

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsRunning(false);
    setCounter(WORK_TIME);
    setIsWorkTime(true);
    setHasStarted(false);
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
