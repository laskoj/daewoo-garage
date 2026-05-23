import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { COLORS } from '../../constants/theme';
import { useGarageStore } from '../../src/store/garageStore';

export default function GarageScreen() {
  const garageImageUri = useGarageStore((state) => state.garageImageUri);
  const setGarageImageUri = useGarageStore((state) => state.setGarageImageUri);

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
    <View style={styles.container}>
      <Text style={styles.heading}>Mój garaż</Text>
      <Text style={styles.lead}>Dodaj zdjęcie swojego Daewoo z galerii telefonu.</Text>

      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Wybierz zdjęcie</Text>
      </Pressable>

      {garageImageUri ? (
        <Image source={{ uri: garageImageUri }} style={styles.photo} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Tu pojawi się zdjęcie auta.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
  },
  lead: {
    color: COLORS.muted,
    marginTop: 6,
    marginBottom: 18,
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
    height: 320,
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
  placeholderText: {
    color: COLORS.muted,
  },
});
