import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockCars = [
  {
    id: '1',
    name: 'Daewoo Lanos',
    year: 1997,
    engine: '1.5L',
    hp: 90,
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Daewoo_Lanos_front.jpg'
  },
  {
    id: '2',
    name: 'Daewoo Matiz',
    year: 1998,
    engine: '0.8L',
    hp: 52,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Daewoo_Matiz_front.jpg'
  },
];

export const fetchCars = createAsyncThunk('cars/fetch', async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCars), 1000)
  );
});

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.favorites.includes(action.payload);
      if (exists) {
        state.favorites = state.favorites.filter(id => id !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
        state.error = 'Błąd ładowania';
      });
  },
});

export const { toggleFavorite } = carsSlice.actions;
export default carsSlice.reducer;