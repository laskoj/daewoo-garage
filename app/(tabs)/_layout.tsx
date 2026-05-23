import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: '#2563eb',

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
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