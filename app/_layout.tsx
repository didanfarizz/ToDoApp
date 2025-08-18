import { AuthProvider, useAuth } from '../context/AuthContext';
import { Stack, useRouter, useSegments } from 'expo-router';
// PERBAIKAN 1: Impor fungsi secara langsung sebagai named export
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import React, { useEffect } from 'react';

// PERBAIKAN 2: Panggil fungsi secara langsung
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
      router.replace('/login');
    }

    // PERBAIKAN 3: Panggil fungsi secara langsung
    hideAsync();

  }, [user, loading, segments, router]);

  if (loading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
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