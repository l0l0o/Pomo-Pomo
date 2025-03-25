import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { timerStyles } from "./styles/timerStyles";

export default function Index() {
  const [counter, setCounter] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const workTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    if (counter === 0) {
      setIsWorkTime(!isWorkTime);
      setCounter(isWorkTime ? workTime : breakTime);
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

  const handleReset = () => {
    setCounter(workTime);
  };

  return (
    <View style={timerStyles.container}>
      <Text style={timerStyles.text}>Pomopomo</Text>
      <Text style={timerStyles.time}>{formatTime(counter)}</Text>
      <View style={timerStyles.buttonContainer}>
        {isRunning ? (
          <TouchableOpacity style={timerStyles.button} onPress={handleStop}>
            <Text style={timerStyles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={timerStyles.button} onPress={handleStart}>
            <Text style={timerStyles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
