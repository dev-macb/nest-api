import { Injectable } from '@nestjs/common';
import { CadastrarEventoDto } from './dto/cadastrar-evento.dto';
import { AtualizarEventoDto } from './dto/atualizar-evento.dto';

@Injectable()
export class EventosService {
  create(createEventoDto: CadastrarEventoDto) {
    return 'This action adds a new evento';
  }

  findAll() {
    return `This action returns all eventos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evento`;
  }

  update(id: number, updateEventoDto: AtualizarEventoDto) {
    return `This action updates a #${id} evento`;
  }

  remove(id: number) {
    return `This action removes a #${id} evento`;
  }
}
