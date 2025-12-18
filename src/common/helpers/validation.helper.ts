import { BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export function validarFormatoId(id) {
  if (!isValidObjectId(id)) {
    throw new BadRequestException(`Formato de ID inválido: ${id}`);
  }
}
