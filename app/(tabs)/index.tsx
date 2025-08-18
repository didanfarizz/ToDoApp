import React, { useState } from 'react';
import { Button, FlatList, Keyboard, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoListScreen() {
  const { logout } = useAuth();
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask: Task = { id: Date.now().toString(), text: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask('');
      Keyboard.dismiss();
    }
  };
  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity style={styles.taskInfo} onPress={() => toggleTask(item.id)}>
          <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
              {item.text}
          </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Daftar Tugas</Text>
        <Button title="Logout" onPress={logout} color="red" />
      </View>
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Tulis tugas baru..." value={task} onChangeText={setTask} />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  header: { fontSize: 24, fontWeight: 'bold' },
  taskContainer: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  taskInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkbox: { width: 24, height: 24, borderRadius: 5, borderWidth: 2, borderColor: '#55AD82', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checkboxCompleted: { backgroundColor: '#55AD82' },
  checkmark: { color: 'white', fontWeight: 'bold' },
  taskText: { fontSize: 16, color: '#333' },
  taskTextCompleted: { textDecorationLine: 'line-through', color: 'gray' },
  deleteText: { color: 'red', fontSize: 14 },
  inputContainer: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderColor: '#f0f0f0', alignItems: 'center' },
  input: { flex: 1, height: 50, backgroundColor: '#F7F8FA', borderRadius: 10, paddingHorizontal: 15, marginRight: 10 },
  addButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#55AD82', justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  list: { flex: 1 },
});
