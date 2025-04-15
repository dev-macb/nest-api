import { PartialType } from '@nestjs/mapped-types';
import { CadastrarEventoDto } from './cadastrar-evento.dto';

class AtualizarEventoDto extends PartialType(CadastrarEventoDto) { }

export { AtualizarEventoDto };
