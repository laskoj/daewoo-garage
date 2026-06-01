import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/theme';
import ThemeToggle from '../../src/components/ThemeToggle';
import { useGarageStore } from '../../src/store/garageStore';
import { useThemeStore } from '../../src/store/themeStore';

export default function GarageScreen() {
  const garageImageUri = useGarageStore((state) => state.garageImageUri);
  const setGarageImageUri = useGarageStore((state) => state.setGarageImageUri);
  const loadGarageImageUri = useGarageStore((state) => state.loadGarageImageUri);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    loadGarageImageUri();
  }, [loadGarageImageUri]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Brak dostępu do galerii. Nie można dodać zdjęcia auta.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setGarageImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.content}>
        <Text style={[styles.heading, isDarkMode && styles.darkHeading]}>Mój garaż</Text>
        <Text style={[styles.lead, isDarkMode && styles.darkLead]}>
          Dodaj zdjęcie swojego Daewoo z galerii telefonu.
        </Text>

        <ThemeToggle />

        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Wybierz zdjęcie</Text>
        </Pressable>

        {garageImageUri ? (
          <Image source={{ uri: garageImageUri }} style={styles.photo} resizeMode="cover" />
        ) : (
          <View style={[styles.placeholder, isDarkMode && styles.darkPlaceholder]}>
            <Text style={[styles.placeholderText, isDarkMode && styles.darkPlaceholderText]}>
              Tu pojawi się zdjęcie auta.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 70,
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  content: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
  },
  darkHeading: {
    color: '#f9fafb',
  },
  lead: {
    color: COLORS.muted,
    marginTop: 6,
    marginBottom: 12,
    textAlign: 'center',
  },
  darkLead: {
    color: '#d1d5db',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
  },
  photo: {
    width: '100%',
    height: 350,
    borderRadius: 22,
  },
  placeholder: {
    height: 260,
    backgroundColor: '#fff',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  darkPlaceholder: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },
  placeholderText: {
    color: COLORS.muted,
  },
  darkPlaceholderText: {
    color: '#9ca3af',
  },
});
