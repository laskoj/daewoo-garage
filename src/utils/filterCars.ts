import { Car } from '../../constants/cars';

export function filterCars(cars: Car[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return cars;
  }

  return cars.filter((car) =>
    `${car.name} ${car.engine} ${car.power}`.toLowerCase().includes(normalizedQuery)
  );
}
