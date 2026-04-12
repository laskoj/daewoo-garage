import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';

export default function Favorites() {
  const { cars, favorites } = useSelector((state: RootState) => state.cars);

  const favCars = cars.filter((c: any) => favorites.includes(c.id));

  return (
    <View>
      {favCars.map((car: any) => (
        <Text key={car.id}>{car.name}</Text>
      ))}
    </View>
  );
}