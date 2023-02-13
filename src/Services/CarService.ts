import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

export default class CreateCarService {
  async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return new Car(newCar);
  }
}