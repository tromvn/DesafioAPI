import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Monster } from './schemas/monster.schema';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';

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
    if (!monster) {
      throw new NotFoundException(`No se encuentra el monstruo con ID ${id}`);
    }

    return monster;
  }

  // para POST /monsters
  async create(createMonsterDto: CreateMonsterDto) {
    // verificar si ya existe un monstruo con ese apiId
    const existingMonster = await this.monsterModel
      .findOne({ apiId: createMonsterDto.apiId })
      .exec();

    // Si existe, 409 (conflict)
    if (existingMonster) {
      throw new ConflictException(
        `Ya existe un monstruo con apiId ${createMonsterDto.apiId}`,
      );
    }

    // crear el nuevo monstruo
    const newMonster = new this.monsterModel(createMonsterDto);
    return await newMonster.save();
  }

  // para PUT /monsters/:id
  async update(id: string, updateMonsterDto: UpdateMonsterDto) {
    // Validar formato de ID
    if (!isValidObjectId(id)) {
      const existingMonster = await this.monsterModel
        .findOne({ apiId: updateMonsterDto.apiId, _id: { $ne: id } })
        .exec();

      // Si se intenta actualizar el apiId, verificar que no exista otro monstruo con el mismo apiId
      if (existingMonster) {
        throw new ConflictException(
          `Ya existe un monstruo con apiId ${updateMonsterDto.apiId}`,
        );
      }
    }

    // Actualizar el monstruo
    const updatedMonster = await this.monsterModel
      .findByIdAndUpdate(id, updateMonsterDto, {
        new: true, // devolver documento actualizado
        runValidators: true, // ejecutar validaciones del schema
      })
      .exec();

    // si no existe el monstruo, 404
    if (!updatedMonster) {
      throw new NotFoundException(
        `No se encuentra el monstruo con apiId ${id}`,
      );
    }

    return updatedMonster;
  }
}
