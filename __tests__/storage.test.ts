import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadFavorites, saveFavorites } from '../src/utils/storage';

describe('storage utils', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('saves and loads favorites', async () => {
    await saveFavorites(['1', '2']);
    await expect(loadFavorites()).resolves.toEqual(['1', '2']);
  });

  it('returns empty array when storage is empty', async () => {
    await expect(loadFavorites()).resolves.toEqual([]);
  });
});
