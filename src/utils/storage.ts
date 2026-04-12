import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorites = async (favorites: string[]) => {
  await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
};

export const loadFavorites = async () => {
  const data = await AsyncStorage.getItem('favorites');
  return data ? JSON.parse(data) : [];
};