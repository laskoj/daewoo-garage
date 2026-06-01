import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGarageStore } from '../src/store/garageStore';

describe('favorites persistence', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    await useGarageStore.getState().clearFavorites();
  });

  it('loads favorite cars from storage', async () => {
    await AsyncStorage.setItem('favorites', JSON.stringify([{ id: '1', name: 'Lanos' }]));
    await useGarageStore.getState().loadFavorites();
    expect(useGarageStore.getState().favorites[0].name).toBe('Lanos');
  });
});
