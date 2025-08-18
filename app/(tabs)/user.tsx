// app/(tabs)/user.tsx

import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext'; // Sesuaikan path jika perlu

const UserAccount = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya, Keluar',
        onPress: () => logout(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={80} color="#ccc" />
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.emailLabel}>You are logged in as:</Text>
      <Text style={styles.emailText}>{user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  emailLabel: {
    fontSize: 16,
    color: 'gray',
  },
  emailText: {
    fontSize: 18,
    marginBottom: 40,
    fontWeight: '500',
  },
  logoutButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#e74c3c', // Warna merah untuk logout
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserAccount;
