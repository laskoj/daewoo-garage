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

type Props = {
  car: Car;
  isFavorite: boolean;
  onFavorite: () => void;
};

function CarCard({ car, isFavorite, onFavorite }: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/car/${car.id}`)}
    >
      <Image source={car.image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{car.name}</Text>

        <Text style={styles.subtitle}>
          {car.year} • {car.engine} • {car.power}
        </Text>

        <Text style={styles.description}>{car.description}</Text>

        <Pressable
          style={[styles.button, isFavorite && styles.favoriteButton]}
          onPress={(event) => {
            event.stopPropagation();
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
  },

  image: {
    width: '100%',
    height: 450,
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

  subtitle: {
    marginTop: 6,
    color: '#6b7280',
  },

  description: {
    marginTop: 10,
    color: '#374151',
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