import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    try {
      const newCar = await this.service.createCar(this.req.body);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const cars = await this.service.getAll();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    try {
      const cars = await this.service.getById(this.req.params.id);
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateCar() {
    try {
      const car = await this.service.updateCar(this.req.params.id, this.req.body);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteCar() {
    try {
      await this.service.deleteCar(this.req.params.id);
      return this.res.status(204).end();
    } catch (error) {
      this.next(error);
    }
  }
}