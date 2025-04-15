import { Injectable } from '@nestjs/common';
import { CreateEventoCategoriaDto } from './dto/cadastrar-evento-categoria.dto';
import { UpdateEventoCategoriaDto } from './dto/atualizar-evento-categoria.dto';

@Injectable()
export class EventoCategoriaService {
  create(createEventoCategoriaDto: CreateEventoCategoriaDto) {
    return 'This action adds a new eventoCategoria';
  }

  findAll() {
    return `This action returns all eventoCategoria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventoCategoria`;
  }

  update(id: number, updateEventoCategoriaDto: UpdateEventoCategoriaDto) {
    return `This action updates a #${id} eventoCategoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventoCategoria`;
  }
}
