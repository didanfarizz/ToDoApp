// context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
// 1. Impor 'createUserWithEmailAndPassword' dari firebase/auth
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User, createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // 2. Tambahkan 'register' ke dalam tipe interface
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  };

  const logout = async () => {
    await signOut(FIREBASE_AUTH);
  };

  // 3. Buat fungsi 'register' baru
  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    // Setelah berhasil, onAuthStateChanged akan otomatis menangani sisanya
  };


  const value = {
    user,
    loading,
    login,
    logout,
    // 4. Sediakan fungsi 'register' di dalam value
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};