import * as chai from 'chai';
import * as sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import cars from '../mock/cars-mock';

const { expect } = chai;

describe('Car Service', function () {
  beforeEach(sinon.restore);

  const carService = new CarService();

  describe('Create car', function () {
    it('Deve ser possivel criar um carro', async function () {
      sinon.stub(Model, 'create').resolves(cars[0]);
  
      const newCar = await carService.createCar(cars[0]);
  
      expect(newCar).to.deep.equal(cars[0]);
    });
  });

  describe('Get Car', function () {
    it('Deve ser possivel listar todos os carros', async function () {
      sinon.stub(Model, 'find').resolves(cars);
  
      const allCars = await carService.getAll();
  
      expect(allCars).to.deep.equal(cars);
    });

    it('Deve ser possivel listar um carro específico', async function () {
      sinon.stub(Model, 'findOne').resolves(cars[1]);
  
      const car = await carService.getById('6348513f34c397abcad040b3');
  
      expect(car).to.deep.equal(cars[1]);
    });

    it('Deve retornar um erro ao passar um id errado', async function () {
      sinon.stub(Model, 'findOne').resolves(null);
  
      const error = await carService
        .getById('invalidId')
        .catch((err) => err);
  
      expect(error.statusCode).to.equal(404);
      expect(error.message).to.equal('Car not found');
    });
  });
});