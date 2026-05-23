import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type FavoriteCar = {
  id: string;
  name: string;
};

type GarageStore = {
  favorites: FavoriteCar[];

  garageImageUri: string | null;

  loadFavorites: () => Promise<void>;

  addFavorite: (
    car: FavoriteCar
  ) => Promise<void>;

  removeFavorite: (
    id: string
  ) => Promise<void>;

  setGarageImageUri: (
    uri: string
  ) => Promise<void>;

  loadGarageImageUri: () => Promise<void>;
};

export const useGarageStore =
  create<GarageStore>((set, get) => ({
    favorites: [],

    garageImageUri: null,

    loadFavorites: async () => {
      const data =
        await AsyncStorage.getItem(
          'favorites'
        );

      if (data) {
        set({
          favorites: JSON.parse(data),
        });
      }
    },

    addFavorite: async (car) => {
      const exists =
        get().favorites.some(
          (item) => item.id === car.id
        );

      if (exists) return;

      const updated = [
        ...get().favorites,
        car,
      ];

      set({
        favorites: updated,
      });

      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(updated)
      );
    },

    removeFavorite: async (id) => {
      const updated =
        get().favorites.filter(
          (item) => item.id !== id
        );

      set({
        favorites: updated,
      });

      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(updated)
      );
    },

    setGarageImageUri: async (
      uri
    ) => {
      set({
        garageImageUri: uri,
      });

      await AsyncStorage.setItem(
        'garageImageUri',
        uri
      );
    },

    loadGarageImageUri:
      async () => {
        const uri =
          await AsyncStorage.getItem(
            'garageImageUri'
          );

        if (uri) {
          set({
            garageImageUri: uri,
          });
        }
      },
  }));