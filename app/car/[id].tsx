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
import ThemeToggle from '../../src/components/ThemeToggle';
import { useThemeStore } from '../../src/store/themeStore';

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const car = cars.find((item) => item.id === id);

  if (!car) {
    return (
      <View style={[styles.center, isDarkMode && styles.darkContainer]}>
        <Text style={isDarkMode && styles.darkText}>Nie znaleziono auta.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Image source={car.image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Wróć</Text>
        </Pressable>

        <ThemeToggle compact />

        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>{car.name}</Text>

        <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
          {car.year} • {car.engine} • {car.power}
        </Text>

        <Text style={[styles.sectionTitle, isDarkMode && styles.darkTitle]}>Opis</Text>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>{car.description}</Text>

        <Text style={[styles.sectionTitle, isDarkMode && styles.darkTitle]}>Dane techniczne</Text>

        <View style={[styles.infoBox, isDarkMode && styles.darkInfoBox]}>
          <Text style={[styles.info, isDarkMode && styles.darkText]}>Rok produkcji: {car.year}</Text>
          <Text style={[styles.info, isDarkMode && styles.darkText]}>Silnik: {car.engine}</Text>
          <Text style={[styles.info, isDarkMode && styles.darkText]}>Moc: {car.power}</Text>
          <Text style={[styles.info, isDarkMode && styles.darkText]}>Marka: Daewoo</Text>
          <Text style={[styles.info, isDarkMode && styles.darkText]}>Dostępne: Hatchback, Sedan, Kombi</Text>
        </View>

        <Text style={[styles.sectionTitle, isDarkMode && styles.darkTitle]}>Ciekawostka</Text>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Daewoo Group (hangul: 대우, hancha: 大宇, transkrypcja poprawiona: Daeu czyt. Deu) – południowokoreański wielobranżowy koncern działający w wielu gałęziach przemysłu, m.in. w okrętownictwie, produkcji sprzętu elektronicznego, nieruchomościach, budownictwie, produkcji sprzętu budowlanego, a także w motoryzacji. Został założony w 1967 roku w Seulu. W 1999 roku koncern ogłosił bankructwo.

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
  darkContainer: {
    backgroundColor: '#111827',
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
  darkTitle: {
    color: '#f9fafb',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#6b7280',
  },
  darkSubtitle: {
    color: '#d1d5db',
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
  darkText: {
    color: '#e5e7eb',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
  },
  darkInfoBox: {
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
});
