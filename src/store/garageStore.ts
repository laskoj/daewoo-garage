import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type FavoriteCar = {
  id: string;
  name: string;
};

type GarageStore = {
  favorites: FavoriteCar[];
  garageImageUri: string | null;
  loading: boolean;
  error: string | null;
  loadFavorites: () => Promise<void>;
  addFavorite: (car: FavoriteCar) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  clearFavorites: () => Promise<void>;
  isFavorite: (id: string) => boolean;
  setGarageImageUri: (uri: string | null) => Promise<void>;
  loadGarageImageUri: () => Promise<void>;
};

const FAVORITES_KEY = 'favorites';
const GARAGE_IMAGE_KEY = 'garageImageUri';

export const useGarageStore = create<GarageStore>((set, get) => ({
  favorites: [],
  garageImageUri: null,
  loading: false,
  error: null,

  loadFavorites: async () => {
    set({ loading: true, error: null });

    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      set({ favorites: data ? JSON.parse(data) : [], loading: false });
    } catch {
      set({ error: 'Nie udało się wczytać ulubionych aut.', loading: false });
    }
  },

  addFavorite: async (car) => {
    const exists = get().favorites.some((item) => item.id === car.id);

    if (exists) return;

    const updated = [...get().favorites, car];
    set({ favorites: updated, error: null });

    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch {
      set({ error: 'Nie udało się zapisać auta w ulubionych.' });
    }
  },

  removeFavorite: async (id) => {
    const updated = get().favorites.filter((item) => item.id !== id);
    set({ favorites: updated, error: null });

    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch {
      set({ error: 'Nie udało się usunąć auta z ulubionych.' });
    }
  },

  clearFavorites: async () => {
    set({ favorites: [], error: null });

    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch {
      set({ error: 'Nie udało się wyczyścić ulubionych.' });
    }
  },

  isFavorite: (id) => get().favorites.some((item) => item.id === id),

  setGarageImageUri: async (uri) => {
    set({ garageImageUri: uri, error: null });

    try {
      if (uri) {
        await AsyncStorage.setItem(GARAGE_IMAGE_KEY, uri);
      } else {
        await AsyncStorage.removeItem(GARAGE_IMAGE_KEY);
      }
    } catch {
      set({ error: 'Nie udało się zapisać zdjęcia garażu.' });
    }
  },

  loadGarageImageUri: async () => {
    try {
      const uri = await AsyncStorage.getItem(GARAGE_IMAGE_KEY);
      set({ garageImageUri: uri });
    } catch {
      set({ error: 'Nie udało się wczytać zdjęcia garażu.' });
    }
  },
}));
