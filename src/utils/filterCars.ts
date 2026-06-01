import { Car } from '../../constants/cars';

export type CarSortMode = 'name-asc' | 'year-desc' | 'power-desc';

export function filterCars(cars: Car[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return cars;
  }

  return cars.filter((car) =>
    `${car.name} ${car.engine} ${car.power} ${car.description}`
      .toLowerCase()
      .includes(normalizedQuery)
  );
}

function getPowerValue(power: string) {
  const match = power.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function sortCars(cars: Car[], mode: CarSortMode) {
  const sortedCars = [...cars];

  if (mode === 'year-desc') {
    return sortedCars.sort((a, b) => b.year - a.year);
  }

  if (mode === 'power-desc') {
    return sortedCars.sort((a, b) => getPowerValue(b.power) - getPowerValue(a.power));
  }

  return sortedCars.sort((a, b) => a.name.localeCompare(b.name));
}
