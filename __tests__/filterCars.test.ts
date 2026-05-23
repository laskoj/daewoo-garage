import { cars } from '../constants/cars';
import { filterCars } from '../src/utils/filterCars';

describe('filterCars', () => {
  it('returns all cars for empty query', () => {
    expect(filterCars(cars, '')).toHaveLength(cars.length);
  });

  it('filters by model name', () => {
    expect(filterCars(cars, 'lanos')[0].name).toBe('Daewoo Lanos');
  });

  it('filters by engine', () => {
    expect(filterCars(cars, '0.8')[0].name).toBe('Daewoo Matiz');
  });

  it('returns empty array when nothing matches', () => {
    expect(filterCars(cars, 'bmw')).toHaveLength(0);
  });
});
