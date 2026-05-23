import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Modele Daewoo',
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