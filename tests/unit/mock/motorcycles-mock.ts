import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

const motorcycles: IMotorcycle[] = [
  {
    id: '6348513f34c397abcad040b2',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },

  {
    id: '6348513f34c397abcad040b3',
    model: 'Honda NC 750X',
    year: 2023,
    color: 'Red',
    status: true,
    buyValue: 75.000,
    category: 'Custom',
    engineCapacity: 700,
  },

  {
    id: '6348513f34c397abcad040b4',
    model: 'Triumph Tiger 660',
    year: 2020,
    color: 'Blue',
    status: true,
    buyValue: 100.000,
    category: 'Trail',
    engineCapacity: 650,
  },
];

export default motorcycles;