import AddTaskModal from '@/components/AddTaskModal';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
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

  const handleEditTask = (title: string, description: string) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, title, description } : t)));
      setEditingTask(null);
    } else {
      const newTask: Task = { id: Date.now().toString(), title, description, completed: false };
      setTasks([...tasks, newTask]);
    }
    setEditingTask(null);
    setIsModalVisible(false);
  }

  const handleEditPress = (task: Task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  // const handleAddTask = (title: string, description: string) => {
  //   const newTask: Task = { id: Date.now().toString(), title, description, completed: false };
  //   setTasks([...tasks, newTask]);
  //   setIsModalVisible(false);
  // };

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
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
        onSubmit={handleEditTask}
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
    padding: 10,
    width: '100%',
    height: 60,
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
  taskText: { fontSize: 16, color: '#333' },
  taskTextCompleted: { textDecorationLine: 'line-through', color: 'gray' },
  deleteText: { color: 'red', fontSize: 14 },
  inputContainer: { padding: 20, borderTopWidth: 1, borderColor: '#f0f0f0', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' },
  input: { flex: 1, height: 50, backgroundColor: '#F7F8FA', borderRadius: 10, paddingHorizontal: 15, marginRight: 10 },
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
  taskTextContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 15,
  },
  addButtonText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  list: { flex: 1 },
  thirdText: { fontSize: 16, color: '#999B9A' },
  actionButton: { padding: 5, marginLeft: 10 },
});
