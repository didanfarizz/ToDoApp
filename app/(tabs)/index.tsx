import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext'; // Impor hook

// Interface Task (sama seperti sebelumnya)
interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoListScreen() {
  const { logout } = useAuth(); // Ambil fungsi logout
  // const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => { /* ... logika ... */ };
  const toggleTask = (id: string) => { /* ... logika ... */ };
  const deleteTask = (id: string) => { /* ... logika ... */ };

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Daftar Tugas</Text>
        <Button title="Logout" onPress={logout} color="red" />
      </View>
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id} />
      {/* ... (UI untuk menambah task sama seperti sebelumnya) ... */}
    </View>
  );
}

// Styles (disingkat, bisa disesuaikan)
const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
    headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    header: { fontSize: 24, fontWeight: 'bold' },
    taskContainer: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }
});