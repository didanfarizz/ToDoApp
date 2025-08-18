import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Link } from 'expo-router';

const RegisterScreen = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validasi input
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "Semua kolom harus diisi.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Password dan konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
    } catch (error: any) {
      Alert.alert("Registrasi Gagal", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Akun Baru</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#55AD82" style={{ marginVertical: 20 }}/>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
      )}

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Sudah punya akun? Login di sini</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F7F8FA' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 },
  input: { width: '100%', height: 50, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#E0E0E0' },
  button: { width: '100%', height: 50, backgroundColor: '#55AD82', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  linkButton: { alignItems: 'center' },
  linkText: { color: '#4A90E2', fontSize: 16 },
});

export default RegisterScreen;