import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGarageStore } from '../src/store/garageStore';

describe('garageStore', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    await useGarageStore.getState().clearFavorites();
    await useGarageStore.getState().setGarageImageUri(null);
  });

  it('adds car to favorites', async () => {
    await useGarageStore.getState().addFavorite({ id: 'lanos', name: 'Daewoo Lanos' });
    expect(useGarageStore.getState().favorites).toHaveLength(1);
  });

  it('does not add duplicated favorites', async () => {
    await useGarageStore.getState().addFavorite({ id: 'lanos', name: 'Daewoo Lanos' });
    await useGarageStore.getState().addFavorite({ id: 'lanos', name: 'Daewoo Lanos' });
    expect(useGarageStore.getState().favorites).toHaveLength(1);
  });

  it('removes favorite car', async () => {
    await useGarageStore.getState().addFavorite({ id: 'lanos', name: 'Daewoo Lanos' });
    await useGarageStore.getState().removeFavorite('lanos');
    expect(useGarageStore.getState().favorites).toHaveLength(0);
  });

  it('checks if car is favorite', async () => {
    await useGarageStore.getState().addFavorite({ id: 'matiz', name: 'Daewoo Matiz' });
    expect(useGarageStore.getState().isFavorite('matiz')).toBe(true);
  });

  it('stores garage image uri', async () => {
    await useGarageStore.getState().setGarageImageUri('file://photo.jpg');
    expect(useGarageStore.getState().garageImageUri).toBe('file://photo.jpg');
  });
});
