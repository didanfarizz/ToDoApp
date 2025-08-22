// src/components/AddTaskModal.tsx

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';

interface TaskData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, description:string, date: string) => void;
  initialData: TaskData | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setSelectedDate(initialData.date || new Date().toISOString().split('T')[0]);
    } else {
      setTitle('');
      setDescription('');
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  }, [initialData, visible]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, description, selectedDate);
      onClose();
    }
  };

  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: '#55AD82' },
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{initialData ? 'Edit Task' : 'Add New Task'}</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.calendarLabel}>Select Date</Text>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            theme={{
              todayTextColor: '#55AD82',
              arrowColor: '#55AD82',
            }}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {initialData ? 'Update Task' : 'Add Task'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  descriptionInput: { height: 80, textAlignVertical: 'top' },
  calendarLabel: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 },
  submitButton: {
    backgroundColor: '#55AD82',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default AddTaskModal;