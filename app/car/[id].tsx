import { useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { cars } from '../../constants/cars';
import { COLORS } from '../../constants/theme';
import { useGarageStore } from '../../src/store/garageStore';

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((item) => item.id === id);

  const addFavorite = useGarageStore((state) => state.addFavorite);
  const removeFavorite = useGarageStore((state) => state.removeFavorite);
  const isFavorite = useGarageStore((state) => state.isFavorite);

  if (!car) {
    return (
      <View style={styles.center}>
        <Text>Nie znaleziono auta.</Text>
      </View>
    );
  }

  const favorite = isFavorite(car.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: car.image }} style={styles.image} resizeMode="cover" />

      <Text style={styles.title}>{car.name}</Text>
      <Text style={styles.subtitle}>
        {car.year} • {car.engine} • {car.power}
      </Text>
      <Text style={styles.description}>{car.description}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Wymagania</Text>
        <Text style={styles.infoText}>tutaj /car/[id].</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          if (favorite) {
            removeFavorite(car.id);
          } else {
            addFavorite({ id: car.id, name: car.name, image: car.image });
          }
        }}
      >
        <Text style={styles.buttonText}>{favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 24,
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 6,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginTop: 18,
  },
  infoTitle: {
    fontWeight: '900',
    marginBottom: 6,
  },
  infoText: {
    color: COLORS.muted,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
  },
});
