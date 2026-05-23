import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type FavoriteCar = {
  id: string;
  name: string;
};

type GarageStore = {
  favorites: FavoriteCar[];
  loadFavorites: () => Promise<void>;
  addFavorite: (car: FavoriteCar) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
};

export const useGarageStore = create<GarageStore>((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    const data = await AsyncStorage.getItem('favorites');

    if (data) {
      set({ favorites: JSON.parse(data) });
    }
  },

  addFavorite: async (car) => {
    const exists = get().favorites.some((item) => item.id === car.id);

    if (exists) return;

    const updated = [...get().favorites, car];

    set({ favorites: updated });
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  },

  removeFavorite: async (id) => {
    const updated = get().favorites.filter((item) => item.id !== id);

    set({ favorites: updated });
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  },

  isFavorite: (id) => {
    return get().favorites.some((item) => item.id === id);
  },
}));