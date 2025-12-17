import { Controller, Get } from '@nestjs/common';
import { MonstersService } from './monsters.service';

@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Get()
  findAll() {
    return this.monstersService.findAll();
  }
}
