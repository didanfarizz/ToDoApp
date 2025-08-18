import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#55AD82' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'To-Do List',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check-square" color={color} />,
        }}
      />
      {/* Anda bisa menambah tab lain di sini, misal: explore.tsx */}
      {/* <Tabs.Screen name="explore" ... /> */}
      <Tabs.Screen
        name="user"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
