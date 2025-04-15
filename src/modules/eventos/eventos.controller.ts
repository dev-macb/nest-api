import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CadastrarEventoDto } from './dto/cadastrar-evento.dto';
import { AtualizarEventoDto } from './dto/atualizar-evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  create(@Body() createEventoDto: CadastrarEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoDto: AtualizarEventoDto) {
    return this.eventosService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }
}
