import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useThemeStore } from '../../src/store/themeStore';

export default function TabsLayout() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: isDarkMode ? '#9ca3af' : '#6b7280',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: isDarkMode ? '#111827' : '#fff',
          borderTopColor: isDarkMode ? '#374151' : '#e5e7eb',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Modele',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="car-sport"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Ulubione',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="heart"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="garage"
        options={{
          title: 'Garaż',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="camera"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
