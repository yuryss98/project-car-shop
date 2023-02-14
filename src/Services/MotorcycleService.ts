import Motorcycle from '../Domains/Motorcycle';
import HttpException from '../error/HttpException';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private ODM: MotorcycleODM;

  constructor() {
    this.ODM = new MotorcycleODM();    
  }

  async create(motorCycle: IMotorcycle) {
    const newMotorcycle = await this.ODM.create(motorCycle);
    return new Motorcycle(newMotorcycle);
  }

  async getAll() {
    const motorcycles = await this.ODM.findAll() as IMotorcycle[];

    return motorcycles.map((motorcycle) => new Motorcycle(motorcycle));
  }

  async getById(id: string) {
    const motorcycle = await this.ODM.findById(id) as IMotorcycle;

    if (!motorcycle) {
      throw new HttpException(404, 'Motorcycle not found');
    }

    return new Motorcycle(motorcycle);
  }

  async updateMotorcycle(id: string, motorcycle: IMotorcycle) {
    await this.getById(id);

    const updatedMotorcycle = new Motorcycle({ id, ...motorcycle });

    await this.ODM.update(id, motorcycle);

    return updatedMotorcycle;
  }

  async deleteMotorcycle(id: string) {
    await this.getById(id);

    await this.ODM.delete(id);
  }
}