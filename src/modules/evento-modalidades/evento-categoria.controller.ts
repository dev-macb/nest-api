import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventoCategoriaService } from './evento-categoria.service';
import { CreateEventoCategoriaDto } from './dto/cadastrar-evento-categoria.dto';
import { UpdateEventoCategoriaDto } from './dto/atualizar-evento-categoria.dto';

@Controller('evento-categoria')
export class EventoCategoriaController {
  constructor(private readonly eventoCategoriaService: EventoCategoriaService) {}

  @Post()
  create(@Body() createEventoCategoriaDto: CreateEventoCategoriaDto) {
    return this.eventoCategoriaService.create(createEventoCategoriaDto);
  }

  @Get()
  findAll() {
    return this.eventoCategoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoCategoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoCategoriaDto: UpdateEventoCategoriaDto) {
    return this.eventoCategoriaService.update(+id, updateEventoCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoCategoriaService.remove(+id);
  }
}
