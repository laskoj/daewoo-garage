import { View, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, toggleFavorite } from '../src/store/carsSlice';
import { RootState } from '../src/store/store';
import CarCard from '../src/components/CarCard';
import { useRouter } from 'expo-router';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cars, favorites, loading } = useSelector(
    (state: RootState) => state.cars
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  const filteredCars = cars.filter((car: any) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Szukaj auta..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <FlatList
        data={filteredCars}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <CarCard
            car={item}
            isFav={favorites.includes(item.id)}
            onPress={() => router.push(`/car/${item.id}`)}
            onFav={() => dispatch(toggleFavorite(item.id))}
          />
        )}
      />
    </View>
  );
}