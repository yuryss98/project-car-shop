import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import HttpException from '../error/HttpException';

export default class CarService {
  private ODM: CarODM;

  constructor() {
    this.ODM = new CarODM();    
  }

  async createCar(car: ICar) {
    const newCar = await this.ODM.create(car);
    return new Car(newCar);
  }

  async getAll() {
    const cars = await this.ODM.findAll() as ICar[];

    return cars.map((car) => new Car(car));
  }

  async getById(id: string) {
    const car = await this.ODM.findById(id) as ICar;

    if (!car) {
      throw new HttpException(404, 'Car not found');
    }

    return new Car(car);
  }

  async updateCar(id: string, car: ICar) {
    await this.getById(id);

    const updatedCar = new Car({ id, ...car });

    await this.ODM.update(id, car);

    return updatedCar;
  }
}