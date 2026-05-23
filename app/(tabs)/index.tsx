import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from 'react-native';

import { useMemo, useState } from 'react';

import CarCard from '../../components/CarCard';
import { cars } from '../../constants/cars';
import { useGarageStore } from '../../src/store/garageStore';

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  const { width } = useWindowDimensions();
  const isTablet = width > 700;

  const favorites = useGarageStore((state) => state.favorites);
  const addFavorite = useGarageStore((state) => state.addFavorite);
  const removeFavorite = useGarageStore((state) => state.removeFavorite);

  const filteredCars = useMemo(() => {
    return cars.filter((car) =>
      car.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Modele Daewoo</Text>

      <TextInput
        placeholder="Szukaj auta..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredCars}
        key={isTablet ? 'tablet' : 'phone'}
        numColumns={isTablet ? 2 : 1}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nie znaleziono auta.</Text>
        }
        renderItem={({ item }) => {
          const isFavorite = favorites.some((car) => car.id === item.id);

          return (
            <View style={styles.item}>
              <CarCard
                car={item}
                isFavorite={isFavorite}
                onFavorite={() => {
                  if (isFavorite) {
                    removeFavorite(item.id);
                  } else {
                    addFavorite({
                      id: item.id,
                      name: item.name,
                    });
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
    marginBottom: 16,
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
});