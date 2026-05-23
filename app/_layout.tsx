import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { useGarageStore } from '../src/store/garageStore';

export default function RootLayout() {
  const loadFavorites = useGarageStore((state) => state.loadFavorites);

  useEffect(() => {
    loadFavorites();
  }, []);

  return <Stack />;
}