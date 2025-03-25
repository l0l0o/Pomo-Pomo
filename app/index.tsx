import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View, Animated } from "react-native";
import { timerStyles, createAnimatedStyles } from "./styles/timerStyles";

export default function Index() {
  const workTime = 25 * 60;
  const breakTime = 5 * 60;

  const [counter, setCounter] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const animationValue = useRef(new Animated.Value(0)).current;

  const animatedStyles = createAnimatedStyles(animationValue);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Animer la transition entre les modes
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isWorkTime ? 0 : 1,
      duration: 500, // durée de l'animation en millisecondes
      useNativeDriver: false, // nécessaire pour les animations de couleur
    }).start();
  }, [isWorkTime]);

  useEffect(() => {
    if (counter === 0) {
      // Si on passe de break à work, on a terminé un cycle, donc on incrémente le compteur
      if (!isWorkTime) {
        setPomodoroCount((prev) => prev + 1);
      }
      setIsWorkTime(!isWorkTime);
      setCounter(isWorkTime ? breakTime : workTime);
    }
  }, [counter, isWorkTime]);

  const handleStart = () => {
    setIsRunning(true);

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

  return (
    <Animated.View
      style={[timerStyles.container, animatedStyles.animatedContainer]}
    >
      <View style={timerStyles.pomodoroCountContainer}>
        <Animated.Text
          style={[
            timerStyles.pomodoroCountText,
            animatedStyles.animatedCountText,
          ]}
        >
          {pomodoroCount} pomodoros
        </Animated.Text>
      </View>
      <Animated.Text style={[timerStyles.text, animatedStyles.animatedText]}>
        {isWorkTime ? "Let's work" : "Take a break"}
      </Animated.Text>
      <Animated.Text style={[timerStyles.time, animatedStyles.animatedTime]}>
        {formatTime(counter)}
      </Animated.Text>
      <View style={timerStyles.buttonContainer}>
        {isRunning ? (
          <TouchableOpacity onPress={handleStop} style={timerStyles.button}>
            <Animated.View
              style={[
                {
                  width: "100%",
                  padding: 10,
                  alignItems: "center",
                  borderRadius: 5,
                },
                animatedStyles.animatedButton,
              ]}
            >
              <Animated.Text
                style={[
                  timerStyles.buttonText,
                  animatedStyles.animatedButtonText,
                ]}
              >
                Pause
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStart} style={timerStyles.button}>
            <Animated.View
              style={[
                {
                  width: "100%",
                  padding: 10,
                  alignItems: "center",
                  borderRadius: 5,
                },
                animatedStyles.animatedButton,
              ]}
            >
              <Animated.Text
                style={[
                  timerStyles.buttonText,
                  animatedStyles.animatedButtonText,
                ]}
              >
                Start
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}
