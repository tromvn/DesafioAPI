import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
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

  // POST /monsters/import/:apiId
  @Post('import/:apiId')
  importFromApi(@Param('apiId') apiId: string) {
    return this.monstersService.importFromExternalApi(Number(apiId));
  }

  // POST /monsters/
  @Post()
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monstersService.create(createMonsterDto);
  }

  // GET /monsters/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monstersService.findOne(id);
  }

  // PUT /monsters/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monstersService.update(id, updateMonsterDto);
  }

  // DELETE /monsters/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monstersService.remove(id);
  }
}
