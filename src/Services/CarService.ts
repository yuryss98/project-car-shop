import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import HttpException from '../error/HttpException';

export default class CreateCarService {
  async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return new Car(newCar);
  }

  async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.listCar() as ICar[];

    return cars.map((car) => new Car(car));
  }

  async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.listCar(id) as ICar;

    if (!car) {
      throw new HttpException(404, 'Car not found');
    }

    return new Car(car);
  }
}