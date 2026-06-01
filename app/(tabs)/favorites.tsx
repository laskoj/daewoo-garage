import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ThemeToggle from '../../src/components/ThemeToggle';
import { useGarageStore } from '../../src/store/garageStore';
import { useThemeStore } from '../../src/store/themeStore';

export default function FavoritesScreen() {
  const favorites = useGarageStore((state) => state.favorites);
  const removeFavorite = useGarageStore((state) => state.removeFavorite);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkHeader]}>Ulubione auta</Text>
      <ThemeToggle />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.empty, isDarkMode && styles.darkEmpty]}>
            Nie masz jeszcze ulubionych aut.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, isDarkMode && styles.darkCard]}>
            <Text style={[styles.title, isDarkMode && styles.darkTitle]}>{item.name}</Text>

            <Pressable
              style={styles.button}
              onPress={() => removeFavorite(item.id)}
            >
              <Text style={styles.buttonText}>Usuń</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 70,
    backgroundColor: '#f3f4f6',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
    color: '#111827',
  },
  darkHeader: {
    color: '#f9fafb',
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
  },
  darkCard: {
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  darkTitle: {
    color: '#f9fafb',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6b7280',
  },
  darkEmpty: {
    color: '#9ca3af',
  },
});
