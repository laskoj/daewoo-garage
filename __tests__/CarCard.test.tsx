import { fireEvent, render } from '@testing-library/react-native';
import CarCard from '../components/CarCard';

const car = {
  id: '1',
  name: 'Daewoo Lanos',
  year: 1999,
  engine: '1.6 16V',
  power: '106 KM',
  description: 'Testowy opis',
  body: 'hatchback',
  fuel: 'benzyna',
  acceleration: '11 s',
  topSpeed: '180 km/h',
  averageFuelUse: '8 l/100 km',
  production: '1997-2002',
  tuningPotential: 'Dobry',
  commonIssues: [],
  pros: [],
  image: 1,
};

describe('CarCard', () => {
  it('renders car name and data', () => {
    const { getByText } = render(<CarCard car={car} isFavorite={false} onFavorite={() => {}} />);
    expect(getByText('Daewoo Lanos')).toBeTruthy();
    expect(getByText(/106 KM/)).toBeTruthy();
  });

  it('shows add favorite button', () => {
    const { getByText } = render(<CarCard car={car} isFavorite={false} onFavorite={() => {}} />);
    expect(getByText('Dodaj do ulubionych')).toBeTruthy();
  });

  it('calls favorite callback', () => {
    const onFavorite = jest.fn();
    const { getByText } = render(<CarCard car={car} isFavorite={false} onFavorite={onFavorite} />);
    fireEvent.press(getByText('Dodaj do ulubionych'));
    expect(onFavorite).toHaveBeenCalled();
  });

  it('shows remove text when favorite', () => {
    const { getByText } = render(<CarCard car={car} isFavorite={true} onFavorite={() => {}} />);
    expect(getByText('Usuń z ulubionych')).toBeTruthy();
  });
});
