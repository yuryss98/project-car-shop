import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';

export default abstract class AbstractODM<T> {
  private model: Model<T>;

  constructor(private schema: Schema, collection: string) {
    this.model = models[collection] || model(collection, this.schema);
  }

  async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  async findAll(): Promise<T[]> {
    return this.model.find({ });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  async update(id: string, updateVehicle: T) {
    await this.model.updateOne({ id }, { updateVehicle });
  }

  async delete(id: string) {
    await this.model.deleteOne({ _id: id });
  }
}