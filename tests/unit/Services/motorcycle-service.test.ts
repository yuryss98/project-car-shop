import * as chai from 'chai';
import * as sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import motorcycles from '../mock/motorcycles-mock';

const { expect } = chai;

describe('Motorcycle Service', function () {
  beforeEach(sinon.restore);

  const motorcycleService = new MotorcycleService();

  describe('Criar motocicleta', function () {
    it('Deve ser possivel criar uma motocicleta', async function () {
      sinon.stub(Model, 'create').resolves(motorcycles[0]);
  
      const newMotorCycle = await motorcycleService.create(motorcycles[0]);
  
      expect(newMotorCycle).to.deep.equal(motorcycles[0]);
    });
  });

  describe('Listar motocicleta', function () {
    it('Deve ser possivel listar todas as motocicletas', async function () {
      sinon.stub(Model, 'find').resolves(motorcycles);
  
      const allMotorcycles = await motorcycleService.getAll();
  
      expect(allMotorcycles).to.deep.equal(motorcycles);
    });

    it('Deve ser possivel listar uma motocicleta específica', async function () {
      sinon.stub(Model, 'findOne').resolves(motorcycles[1]);
  
      const motorcycle = await motorcycleService.getById('6348513f34c397abcad040b3');
  
      expect(motorcycle).to.deep.equal(motorcycles[1]);
    });

    it('Deve retornar um erro ao passar um id errado', async function () {
      sinon.stub(Model, 'findOne').resolves(null);
  
      const error = await motorcycleService
        .getById('invalidId')
        .catch((err) => err);
  
      expect(error.statusCode).to.equal(404);
      expect(error.message).to.equal('Motorcycle not found');
    });
  });

  describe('Atualizar motocicleta', function () {
    it('Deve ser possivel atualizar uma motocicleta', async function () {
      sinon.stub(Model, 'findOne').resolves(motorcycles[2]);
      sinon.stub(Model, 'updateOne').resolves();

      const motorCycleId = '6348513f34c397abcad040b4';
  
      const updatedMotorcycle = await motorcycleService.update(motorCycleId, motorcycles[0]);
  
      expect(updatedMotorcycle).to.deep.equal(motorcycles[0]);
    });
  });
});