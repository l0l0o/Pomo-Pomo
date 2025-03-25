import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.text}>Pomopomo</Text>
      <Text style={styles.time}>{formatTime(counter)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStop}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: "#FFA4AF",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFCCD2",
  },
  time: {
    fontSize: 76,
    fontWeight: "bold",
    color: "#C07B84",
  },
  button: {
    backgroundColor: "#FFCCD2",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  buttonText: {
    color: "#C07B84",
    fontSize: 24,
    fontWeight: "bold",
  },
});
