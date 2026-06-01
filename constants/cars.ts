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
    year: 1997,
    engine: '1.4,1.5,1.6',
    power: '75-106 KM',
    description: 'Daewoo Lanos – samochód osobowy produkowany pod marką Daewoo w latach 1997–2008, pod polską marką FSO jako FSO Lanos w latach 2004–2008.',
    image: require('../assets/images/lanos.jpg'),
  },
  {
    id: '2',
    name: 'Daewoo Matiz',
    year: 1998,
    engine: '0.8',
    power: '52 KM',
    description: 'Daewoo Matiz – samochód osobowy klasy miejskiej produkowany pod marką Daewoo w latach 1998–2011.',
    image: require('../assets/images/matiz.jpg'),
  },
  {
    id: '3',
    name: 'Daewoo Nubira',
    year: 1997,
    engine: '1.6, 2.0',
    power: '106-133 KM',
    description: 'Daewoo Nubira – samochód osobowy z pogranicza klasy kompaktowej produkowany pod marką Daewoo w latach 1997–2012.',
    image: require('../assets/images/nubira.jpg'),
  },
  {
    id: '4',
    name: 'Daewoo Leganza',
    year: 1997,
    engine: '2.0',
    power: '133 KM',
    description: 'Daewoo Leganza – samochód osobowy klasy średniej, produkowany pod południowokoreańską marką Daewoo w latach 1997–2008.',
    image: require('../assets/images/leganza.jpg'),
  },
  {
    id: '5',
    name: 'Daewoo Tico',
    year: 1991,
    engine: '0.8',
    power: '41 KM',
    description: 'Daewoo Tico – samochód osobowy klasy miejskiej produkowany pod marką Daewoo w latach 1991–2001.',
    image: require('../assets/images/tico.jpg'),
  },
  {
    id: '6',
    name: 'Daewoo Espero',
    year: '1990',
    engine: '1.5, 1.8',
    power: '90–106 KM',
    description:
    'Daewoo Espero – samochód osobowy klasy średniej produkowany pod południowokoreańską marką Daewoo w latach 1990–1999',
    image: require('../assets/images/espero.jpg'),
},
];