import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
};

type TaskContextType = {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  addTask: (title: string, description: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setCurrentTask: (task: Task | null) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TASKS: "tasks",
  CURRENT_TASK: "currentTask",
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTaskState] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // Chargement initial des tâches depuis AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const tasksData = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
        const currentTaskData = await AsyncStorage.getItem(
          STORAGE_KEYS.CURRENT_TASK
        );

        if (tasksData) {
          setTasks(JSON.parse(tasksData));
        }

        if (currentTaskData) {
          setCurrentTaskState(JSON.parse(currentTaskData));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des tâches:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Ajouter une nouvelle tâche
  const addTask = async (title: string, description: string) => {
    try {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        completed: false,
        createdAt: Date.now(),
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      await AsyncStorage.setItem(
        STORAGE_KEYS.TASKS,
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une tâche:", error);
    }
  };

  // Marquer une tâche comme complétée ou non
  const toggleTaskCompletion = async (id: string) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      setTasks(updatedTasks);

      // Si la tâche courante est mise à jour, mettre à jour currentTask aussi
      if (currentTask && currentTask.id === id) {
        const updatedCurrentTask = {
          ...currentTask,
          completed: !currentTask.completed,
        };
        setCurrentTaskState(updatedCurrentTask);
        await AsyncStorage.setItem(
          STORAGE_KEYS.CURRENT_TASK,
          JSON.stringify(updatedCurrentTask)
        );
      }

      await AsyncStorage.setItem(
        STORAGE_KEYS.TASKS,
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour d'une tâche:", error);
    }
  };

  // Supprimer une tâche
  const deleteTask = async (id: string) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);

      // Si la tâche courante est supprimée, effacer currentTask
      if (currentTask && currentTask.id === id) {
        setCurrentTaskState(null);
        await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_TASK);
      }

      await AsyncStorage.setItem(
        STORAGE_KEYS.TASKS,
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression d'une tâche:", error);
    }
  };

  // Définir la tâche actuelle
  const setCurrentTask = async (task: Task | null) => {
    try {
      setCurrentTaskState(task);

      if (task) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.CURRENT_TASK,
          JSON.stringify(task)
        );
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_TASK);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la définition de la tâche courante:",
        error
      );
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        currentTask,
        loading,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        setCurrentTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
