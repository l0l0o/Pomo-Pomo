import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./styles/timerStyles";
import { TaskProvider } from "./context/TaskContext";
import { PomodoroProvider } from "./context/PomodoroContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <TaskProvider>
        <PomodoroProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: colors.work.time,
              tabBarInactiveTintColor: colors.work.buttonText,
              tabBarStyle: {
                backgroundColor: colors.work.buttonBg,
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: 60,
                paddingBottom: 10,
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Pomodoro",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="time-outline" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="tasks"
              options={{
                title: "Tâches",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="list-outline" size={size} color={color} />
                ),
              }}
            />
          </Tabs>
        </PomodoroProvider>
      </TaskProvider>
    </SafeAreaProvider>
  );
}
