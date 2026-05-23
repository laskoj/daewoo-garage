export type Car = {
  id: string;
  name: string;
  year: number;
  engine: string;
  power: string;
  description: string;
  image: any;
};

export const cars: Car[] = [
  {
    id: '1',
    name: 'Daewoo Lanos',
    year: 1999,
    engine: '1.6 16V',
    power: '106 KM',
    description: 'Obecnie najpopularniejszy model Daewoo.',
    image: require('../assets/images/lanos.jpg'),
  },
  {
    id: '2',
    name: 'Daewoo Matiz',
    year: 1998,
    engine: '0.8',
    power: '52 KM',
    description: 'Miejski model Daewoo, lekki i prosty w obsłudze.',
    image: require('../assets/images/matiz.jpg'),
  },
  {
    id: '3',
    name: 'Daewoo Nubira',
    year: 2001,
    engine: '2.0',
    power: '133 KM',
    description: 'Większy model rodzinny z wygodnym wnętrzem.',
    image: require('../assets/images/nubira.jpg'),
  },
  {
    id: '4',
    name: 'Daewoo Leganza',
    year: 2000,
    engine: '2.0',
    power: '133 KM',
    description: 'Większy model rodzinny z wygodnym wnętrzem.',
    image: require('../assets/images/leganza.jpg'),
  },
];