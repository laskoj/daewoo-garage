import { useGarageStore } from '../src/store/garageStore';

describe('garageStore', () => {
  beforeEach(() => {
    useGarageStore.getState().clearFavorites();
    useGarageStore.getState().setGarageImageUri(null);
  });

  it('adds car to favorites', () => {
    useGarageStore.getState().addFavorite({ id: 'lanos', name: 'Daewoo Lanos' });
    expect(useGarageStore.getState().favorites).toHaveLength(1);
  });

  it('does not add duplicated favorites', () => {
    useGarageStore.getState().addFavorite({ id: 'lanos', name: 'Daewoo Lanos' });
    useGarageStore.getState().addFavorite({ id: 'lanos', name: 'Daewoo Lanos' });
    expect(useGarageStore.getState().favorites).toHaveLength(1);
  });

  it('removes favorite car', () => {
    useGarageStore.getState().addFavorite({ id: 'lanos', name: 'Daewoo Lanos' });
    useGarageStore.getState().removeFavorite('lanos');
    expect(useGarageStore.getState().favorites).toHaveLength(0);
  });

  it('checks if car is favorite', () => {
    useGarageStore.getState().addFavorite({ id: 'matiz', name: 'Daewoo Matiz' });
    expect(useGarageStore.getState().isFavorite('matiz')).toBe(true);
  });

  it('stores garage image uri', () => {
    useGarageStore.getState().setGarageImageUri('file://photo.jpg');
    expect(useGarageStore.getState().garageImageUri).toBe('file://photo.jpg');
  });
});
