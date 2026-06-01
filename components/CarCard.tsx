import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Car } from '../constants/cars';
import { useThemeStore } from '../src/store/themeStore';

type Props = {
  car: Car;
  isFavorite: boolean;
  onFavorite: () => void;
};

function CarCard({ car, isFavorite, onFavorite }: Props) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <Pressable
      style={[styles.card, isDarkMode && styles.darkCard]}
      onPress={() => router.push(`/car/${car.id}`)}
    >
      <Image source={car.image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>{car.name}</Text>

        <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
          {car.year} • {car.engine} • {car.power}
        </Text>

        <Text style={[styles.description, isDarkMode && styles.darkDescription]}>
          {car.description}
        </Text>

        <Pressable
          style={[styles.button, isFavorite && styles.favoriteButton]}
          onPress={(event) => {
            event?.stopPropagation?.();
            onFavorite();
          }}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default React.memo(CarCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  darkCard: {
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
  },
  image: {
    width: '100%',
    height: 350,
    backgroundColor: '#d1d5db',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  darkTitle: {
    color: '#f9fafb',
  },
  subtitle: {
    marginTop: 6,
    color: '#6b7280',
  },
  darkSubtitle: {
    color: '#d1d5db',
  },
  description: {
    marginTop: 10,
    color: '#374151',
  },
  darkDescription: {
    color: '#e5e7eb',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  favoriteButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
