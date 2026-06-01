import * as Haptics from 'expo-haptics';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

import CarCard from '../../components/CarCard';
import { cars } from '../../constants/cars';
import OfflineBanner from '../../src/components/OfflineBanner';
import ThemeToggle from '../../src/components/ThemeToggle';
import { useGarageStore } from '../../src/store/garageStore';
import { useThemeStore } from '../../src/store/themeStore';
import { CarSortMode, filterCars, sortCars } from '../../src/utils/filterCars';

const sortOptions: { label: string; value: CarSortMode }[] = [
  { label: 'A-Z', value: 'name-asc' },
  { label: 'Najnowsze', value: 'year-desc' },
  { label: 'Najmocniejsze', value: 'power-desc' },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<CarSortMode>('name-asc');

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const { width } = useWindowDimensions();
  const columns = width > 900 ? 3 : width > 650 ? 2 : 1;

  const favorites = useGarageStore((state) => state.favorites);
  const error = useGarageStore((state) => state.error);
  const loadFavorites = useGarageStore((state) => state.loadFavorites);
  const addFavorite = useGarageStore((state) => state.addFavorite);
  const removeFavorite = useGarageStore((state) => state.removeFavorite);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const visibleCars = useMemo(() => {
    return sortCars(filterCars(cars, search), sortMode);
  }, [search, sortMode]);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkHeader]}>Modele Daewoo</Text>
      <ThemeToggle />
      <OfflineBanner />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Szukaj auta, silnika lub mocy..."
        placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
        value={search}
        onChangeText={setSearch}
        style={[styles.search, isDarkMode && styles.darkSearch]}
      />

      <View style={styles.sortRow}>
        {sortOptions.map((option) => (
          <Pressable
            key={option.value}
            style={[
              styles.sortButton,
              isDarkMode && styles.darkSortButton,
              sortMode === option.value && styles.activeSortButton,
            ]}
            onPress={() => setSortMode(option.value)}
          >
            <Text
              style={[
                styles.sortText,
                isDarkMode && styles.darkSortText,
                sortMode === option.value && styles.activeSortText,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={visibleCars}
        key={columns}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        windowSize={7}
        ListEmptyComponent={
          <Text style={[styles.empty, isDarkMode && styles.darkEmpty]}>
            Nie znaleziono auta. Dostępne są tylko modele Daewoo.
          </Text>
        }
        renderItem={({ item }) => {
          const isFavorite = favorites.some((car) => car.id === item.id);

          return (
            <View style={styles.item}>
              <CarCard
                car={item}
                isFavorite={isFavorite}
                onFavorite={async () => {
                  await Haptics.selectionAsync();

                  if (isFavorite) {
                    await removeFavorite(item.id);
                  } else {
                    await addFavorite({ id: item.id, name: item.name });
                  }
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 70,
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
  search: {
    backgroundColor: '#fff',
    color: '#111827',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  darkSearch: {
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    borderWidth: 1,
    borderColor: '#374151',
  },
  sortRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  darkSortButton: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },
  activeSortButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  sortText: {
    color: '#374151',
    fontWeight: '700',
  },
  darkSortText: {
    color: '#d1d5db',
  },
  activeSortText: {
    color: '#fff',
  },
  list: {
    paddingBottom: 24,
  },
  item: {
    flex: 1,
    marginHorizontal: 6,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6b7280',
  },
  darkEmpty: {
    color: '#9ca3af',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
});
