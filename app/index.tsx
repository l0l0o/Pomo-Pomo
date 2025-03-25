import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [counter, setCounter] = useState(25 * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
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
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Pomopomo</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {formatTime(counter)}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={handleStart}
        >
          <Text style={{ color: "white" }}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={handleStop}
        >
          <Text style={{ color: "white" }}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
