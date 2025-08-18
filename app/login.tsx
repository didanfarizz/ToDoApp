import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email.trim() && password.trim()) {
      setLoading(true);
      try {
        await login(email, password);
      } catch (error: any) {
        // Tampilkan pesan error dari Firebase
        Alert.alert('Login Gagal', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      {isLoading ? (
        <ActivityIndicator size="large" color="#55AD82" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <Link href="/register" asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text>Belum punya akun?</Text>
          <Text style={styles.linkText}> Daftar di sini</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#55AD82', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  logo: { width: 80, height: 80, alignSelf: 'center', marginBottom: 20 },
  linkButton: { alignItems: 'center', marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center'     },
  linkText: { color: '#4A90E2', fontSize: 16 },
});

export default LoginScreen;
