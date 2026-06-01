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
import { useGarageStore } from '../../src/store/garageStore';
import { CarSortMode, filterCars, sortCars } from '../../src/utils/filterCars';

const sortOptions: { label: string; value: CarSortMode }[] = [
  { label: 'A-Z', value: 'name-asc' },
  { label: 'Najnowsze', value: 'year-desc' },
  { label: 'Najmocniejsze', value: 'power-desc' },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<CarSortMode>('name-asc');

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
    <View style={styles.container}>
      <Text style={styles.header}>Modele Daewoo</Text>
      <OfflineBanner />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Szukaj auta, silnika lub mocy..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <View style={styles.sortRow}>
        {sortOptions.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.sortButton, sortMode === option.value && styles.activeSortButton]}
            onPress={() => setSortMode(option.value)}
          >
            <Text style={[styles.sortText, sortMode === option.value && styles.activeSortText]}>
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
        ListEmptyComponent={<Text style={styles.empty}>Nie znaleziono auta.</Text>}
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
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
    color: '#111827',
  },
  search: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
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
  activeSortButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  sortText: {
    color: '#374151',
    fontWeight: '700',
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
  error: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
});
