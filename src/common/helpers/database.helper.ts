import {
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';

export async function buscarPorIdOFallar<T>(
  model: Model<T>,
  id: string,
  nombreEntidad: string,
): Promise<T> {
  // Validar formato
  if (!isValidObjectId(id)) {
    throw new BadRequestException(`Formato de ID inválido: ${id}`);
  }

  // Buscar
  const documento = await model.findById(id).exec();

  // Validar existencia
  if (!documento) {
    throw new NotFoundException(
      `No se encuentra ${nombreEntidad} con ID ${id}`,
    );
  }

  return documento;
}

export async function verificarDuplicado<T>(
  model: Model<T>,
  campo: string,
  valor: any,
  idExcluir?: string,
  nombreEntidad?: string,
): Promise<void> {
  const filtro: any = { [campo]: valor };

  if (idExcluir) {
    filtro._id = { $ne: idExcluir };
  }

  const existente = await model.findOne(filtro).exec();

  if (existente) {
    throw new ConflictException(
      `Ya existe ${nombreEntidad || 'un registro'} con ${campo} ${valor}`,
    );
  }
}

export async function actualizarPorIdOFallar<T>(
  model: Model<T>,
  id: string,
  datos: any,
  nombreEntidad: string,
): Promise<T> {
  // Validar formato
  if (!isValidObjectId(id)) {
    throw new BadRequestException(`Formato de ID inválido: ${id}`);
  }

  // Actualizar
  const actualizado = await model
    .findByIdAndUpdate(id, datos, {
      new: true,
      runValidators: true,
    })
    .exec();

  // Validar existencia
  if (!actualizado) {
    throw new NotFoundException(
      `No se encuentra ${nombreEntidad} con ID ${id}`,
    );
  }

  return actualizado;
}
