import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Monster } from './schemas/monster.schema';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
  ) {}

  // para GET /monsters
  async findAll() {
    return await this.monsterModel.find().exec();
  }

  // para GET /monsters/:id
  async findOne(id: string) {
    // validar id
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Formato de ID inválido: ${id}`);
    }

    // buscar monstruo
    const monster = await this.monsterModel.findById(id).exec();

    // si no existe, 404
    if (!Monster) {
      throw new NotFoundException(`No se encuentra el monstruo con ID ${id}`);
    }

    return monster;
  }
}
