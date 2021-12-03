import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const foundRepeatTask = tasks.find(task => task.title === newTaskTitle);

    if(foundRepeatTask) {
      Alert.alert('Task já cadastrada!', 'Você não pode cadastrar uma task com mesmo nome');
    };

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {

    const newTasksWithTaskDone = tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done;
      }

      return task;
    });

    setTasks(newTasksWithTaskDone);
  }

  function handleRemoveTask(id: number) {

    Alert.alert("Remover item", "Você tem certeza que deseja remover esse item?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          setTasks(tasks.filter(task => task.id !== id));
        }
      }
    ])

  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const newTasksWithTaskEditted = tasks.map(task => {
      if (task.id === taskId) {
        task.title = taskNewTitle;
      }

      return task;
    });

    setTasks(newTasksWithTaskEditted);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})