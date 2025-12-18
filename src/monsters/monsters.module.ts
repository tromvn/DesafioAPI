import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MonstersController } from './monsters.controller';
import { MonstersService } from './monsters.service';
import { Monster, MonsterSchema } from './schemas/monster.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Monster.name, schema: MonsterSchema }]),
    HttpModule,
  ],
  controllers: [MonstersController],
  providers: [MonstersService],
})
export class MonstersModule {}
