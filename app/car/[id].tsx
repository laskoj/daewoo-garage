import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../src/store/store';

export default function CarDetails() {
  const { id } = useLocalSearchParams();
  const { cars } = useSelector((state: RootState) => state.cars);

  const car = cars.find((c: any) => c.id === id);

  if (!car) return <Text>Brak danych</Text>;

  return (
    <View>
      <Text>{car.name}</Text>
      <Text>Rok: {car.year}</Text>
    </View>
  );
}