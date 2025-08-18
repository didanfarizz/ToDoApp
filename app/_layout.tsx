import { AuthProvider, useAuth } from '../context/AuthContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import React, { useEffect } from 'react';

preventAutoHideAsync();

const InitialLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    const inTabsGroup = segments[0] === '(tabs)';

    if (user && !inTabsGroup) {
      router.replace('/(tabs)');
    } else if (!user && inTabsGroup) {
      // INI ADALAH BAGIAN KRUSIAL YANG MEMBUAT REDIRECT BEKERJA
      router.replace('/login');
    }

    hideAsync();

  }, [user, loading, segments, router]);

  if (loading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;