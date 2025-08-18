// components/AddTaskModal.tsx

import React, { useState, useEffect } from 'react';
import {Text, TextInput, StyleSheet, TouchableOpacity, Modal, Keyboard, Pressable } from 'react-native';

// Definisikan tipe untuk data awal
interface TaskData {
  title: string;
  description: string;
}

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  initialData?: TaskData | null; // Prop baru untuk data edit
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // useEffect untuk mengisi form saat mode edit
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    } else {
      // Pastikan form kosong saat mode tambah
      setTitle('');
      setDescription('');
    }
  }, [initialData, visible]); // Jalankan efek saat initialData atau visibilitas berubah

  const handleSave = () => {
    if (title.trim()) {
      onSubmit(title, description);
    } else {
      alert('Judul tugas tidak boleh kosong.');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={Keyboard.dismiss}>
          <Text style={styles.modalTitle}>{initialData ? 'Edit Tugas' : 'Tugas Baru'}</Text>
          <Text style={styles.label}>Judul</Text>
          <TextInput
            style={[styles.input, styles.titleInput]}
            placeholder="Contoh: Membuat UI/UX"
            value={title}
            onChangeText={setTitle}
            autoFocus={true}
          />

          <Text style={styles.label}>Deskripsi</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="(Opsional)"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
            <Text style={styles.submitButtonText}>{initialData ? 'Simpan Perubahan' : 'Tambah Tugas'}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

// ... (Stylesheet tidak berubah)
const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 15, padding: 20, elevation: 10 },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 14, color: '#666', marginBottom: 8, },
    input: { fontSize: 16, color: '#8c8c8cff', borderColor: '#ddd', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15 },
    titleInput: { paddingVertical: 12, fontWeight: '500' },
    descriptionInput: { height: 80, textAlignVertical: 'top', paddingVertical: 12 },
    submitButton: { backgroundColor: '#55AD82', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    submitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});


export default AddTaskModal;