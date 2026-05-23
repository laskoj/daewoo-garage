import { useGarageStore } from '../src/store/garageStore';

describe('favorites', () => {
  it('adds favorite car', () => {
    useGarageStore.getState().addFavorite({
      id: '1',
      name: 'Lanos',
      image: '',
    });

    expect(
      useGarageStore.getState().favorites.length
    ).toBe(1);
  });
});