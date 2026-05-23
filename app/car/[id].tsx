import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { cars } from '../../constants/cars';

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();

  const car = cars.find((item) => item.id === id);

  if (!car) {
    return (
      <View style={styles.center}>
        <Text>Nie znaleziono auta.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={car.image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Wróć</Text>
        </Pressable>

        <Text style={styles.title}>{car.name}</Text>

        <Text style={styles.subtitle}>
          {car.year} • {car.engine} • {car.power}
        </Text>

        <Text style={styles.sectionTitle}>Opis</Text>
        <Text style={styles.text}>{car.description}</Text>

        <Text style={styles.sectionTitle}>Dane techniczne</Text>

        <View style={styles.infoBox}>
          <Text style={styles.info}>Rok produkcji: {car.year}</Text>
          <Text style={styles.info}>Silnik: {car.engine}</Text>
          <Text style={styles.info}>Moc: {car.power}</Text>
          <Text style={styles.info}>Marka: Daewoo</Text>
          <Text style={styles.info}>Typ aplikacji: katalog modeli</Text>
        </View>

        <Text style={styles.sectionTitle}>Ciekawostka</Text>
        <Text style={styles.text}>
          Ten model dobrze pasuje do projektu, bo można opisać jego dane,
          historię, popularność oraz przykładowe modyfikacje.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#d1d5db',
  },

  content: {
    padding: 20,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },

  backText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '700',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#6b7280',
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },

  infoBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
  },

  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
});