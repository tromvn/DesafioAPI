import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Monster } from './schemas/monster.schema';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
  ) {}

  async findAll() {
    return await this.monsterModel.find().exec();
  }

  async findOne(id:string) {
    const monster = await this.monsterModel.findById(id).exec();

    if (!Monster) {
      throw new NotFoundException(`No se encuentra el monstruo con ID ${id}`);
    }

    return monster;
  }
}
