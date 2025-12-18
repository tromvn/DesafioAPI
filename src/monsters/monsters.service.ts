import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Monster } from './schemas/monster.schema';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { validarFormatoId } from 'src/common/helpers/validation.helper';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
    private readonly httpService: HttpService,
  ) {}

  // para GET /monsters
  async findAll() {
    return await this.monsterModel.find().exec();
  }

  // para GET /monsters/:id
  async findOne(id: string) {
    // validar id
    validarFormatoId(id);

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
    validarFormatoId(id);

    // si se intenta actualizar el apiId, verificar que no exista otro monstruo con el mismo apiId
    if (updateMonsterDto.apiId) {
      const existingMonster = await this.monsterModel
        .findOne({ apiId: updateMonsterDto.apiId, _id: { $ne: id } })
        .exec();

      // si existe, 409 conflict
      if (existingMonster) {
        throw new ConflictException(
          `Ya existe un monstruo con apiId ${updateMonsterDto.apiId}`,
        );
      }
    }

    // actualizar el monstruo
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

  // para DELETE /monsters/:id
  async remove(id: string) {
    // validar formato de ID
    validarFormatoId(id);

    // Eliminar el monstruo
    const deletedMonster = await this.monsterModel.findByIdAndDelete(id).exec();

    // si no existe, 404
    if (!deletedMonster) {
      throw new NotFoundException(`No se encuentra el monstruo con ID ${id}`);
    }

    return deletedMonster;
  }

  // para consumir api pública de ragnarok
  async fetchFromExternalApi(apiId: number): Promise<any> {
    try {
      const url = `https://ragnapi.com/api/v1/re-newal/monsters/${apiId}`;

      // petición HTTP
      const response = await firstValueFrom(this.httpService.get(url));

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException(
            `Monstruo con apiId ${apiId} no encontrado en API externa`,
          );
        }
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(
        `Error buscando monstruo desde API externa: ${errorMessage}`,
      );
    }
  }
}
