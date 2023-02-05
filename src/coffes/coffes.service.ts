import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Coffee, CoffeDocument } from './coffes.schema';

@Injectable()
export class CoffesService {
  constructor(@InjectModel(Coffee.name) private coffeModel: Model<Coffee>) {}

  async create(coffee: CoffeDocument) {
    const createdCoffee = new this.coffeModel(coffee);
    createdCoffee.index = `${(await this.coffeModel.find().exec()).length + 1}`;
    return createdCoffee.save();
  }
  async findAllCoffee() {
    return this.coffeModel.find().exec();
  }
  async findOneCoffee(params: FilterQuery<Coffee>) {
    return this.coffeModel.findOne(params);
  }
  async updateCoffee(params: FilterQuery<Coffee>, body: UpdateQuery<Coffee>) {
    return this.coffeModel.findOneAndUpdate(params, body);
  }
}
