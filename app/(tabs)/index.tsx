import AddTaskModal from '@/components/AddTaskModal'; 
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

export default function TodoListScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' }));
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSaveTask = (title: string, description: string, date: string) => {
    if (editingTask) {
      // Mode Edit
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, title, description, date } : t)));
    } else {
      // Mode Tambah Baru
      const newTask: Task = { id: Date.now().toString(), title, description, completed: false, date };
      setTasks([...tasks, newTask]);
    }
    setEditingTask(null);
    setIsModalVisible(false);
  }

  const handleEditPress = (task: Task) => {
    setEditingTask(task);
    setIsModalVisible(true);
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
        <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>{item.completed && <Text style={styles.checkmark}>✓</Text>}</View>
        <View style={styles.taskTextContainer}>
          <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>{item.title}</Text>
          {item.description ? <Text style={[styles.taskDescription, item.completed && styles.taskTextCompleted]}>{item.description}</Text> : null}
          <Text style={styles.taskDate}><FontAwesome name="calendar" size={12} color="#888" /> {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEditPress(item)} style={styles.actionButton}>
        <Text style={styles.deleteText}><FontAwesome name="pencil" size={20} color="#55AD82" /></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.actionButton}>
        <Text style={styles.deleteText}><FontAwesome name="trash" size={20} color="red" /></Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.thirdText}>Today,</Text>
        <View>
          <Text style={styles.header}>{currentTime}</Text>
        </View>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
        </View>
      ) : (
        <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id} />
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
          <FontAwesome size={24} name="plus" color="white" />
        </TouchableOpacity>
        <AddTaskModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setEditingTask(null);
          }}
          onSubmit={handleSaveTask}
          initialData={editingTask}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  headerContainer: { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20 },
  header: { fontSize: 24, fontWeight: 'bold' },
  taskContainer: {
    padding: 15,
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#55AD82',
    backgroundColor: '#EDF9F1',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 10,
  },
  taskInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkbox: { width: 24, height: 24, borderRadius: 5, borderWidth: 2, borderColor: '#55AD82', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checkboxCompleted: { backgroundColor: '#55AD82' },
  checkmark: { color: 'white', fontWeight: 'bold' },
  taskText: { fontSize: 16, color: '#333', fontWeight: 'bold' }, // Buat judul tebal
  taskTextCompleted: { textDecorationLine: 'line-through', color: 'gray', fontWeight: 'normal' },
  deleteText: { color: 'red', fontSize: 14 },
  inputContainer: { padding: 20, borderTopWidth: 1, borderColor: '#f0f0f0', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: '#55AD82',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  taskDate: { 
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  taskTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  thirdText: { fontSize: 16, color: '#999B9A' },
  actionButton: { padding: 5, marginLeft: 10 },
  emptyContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});