import { cars } from '../constants/cars';
import { filterCars, sortCars } from '../src/utils/filterCars';

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

  it('sorts cars alphabetically', () => {
    expect(sortCars(cars, 'name-asc')[0].name).toBe('Daewoo Lanos');
  });

  it('sorts cars by year descending', () => {
    expect(sortCars(cars, 'year-desc')[0].year).toBe(2001);
  });

  it('sorts cars by power descending', () => {
    expect(sortCars(cars, 'power-desc')[0].power).toBe('133 KM');
  });
});
