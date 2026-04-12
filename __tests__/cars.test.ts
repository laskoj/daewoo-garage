import carsReducer, { toggleFavorite } from '../../src/store/carsSlice';

test('dodaje do ulubionych', () => {
  const state = {
    cars: [],
    favorites: [],
    loading: false,
    error: null,
  };

  const newState = carsReducer(state, toggleFavorite('1'));

  expect(newState.favorites).toContain('1');
});