import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class DropDto {
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsNumber()
  @Min(0)
  chance: number;
}

export class CreateMonsterDto {
  @IsNumber()
  @IsNotEmpty()
  apiId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  level?: number;

  @IsNumber()
  @IsOptional()
  hp?: number;

  @IsNumber()
  @IsOptional()
  baseExp?: number;

  @IsNumber()
  @IsOptional()
  jobExp?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DropDto)
  @IsOptional()
  drops?: DropDto[];
}
