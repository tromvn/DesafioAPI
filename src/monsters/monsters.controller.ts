import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';

@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}
  // GET /monsters
  @Get()
  findAll() {
    return this.monstersService.findAll();
  }

  // GET /monsters/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monstersService.findOne(id);
  }

  // POST /monsters/
  @Post()
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monstersService.create(createMonsterDto);
  }

  // PUT /monsters/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monstersService.update(id, updateMonsterDto);
  }
}
