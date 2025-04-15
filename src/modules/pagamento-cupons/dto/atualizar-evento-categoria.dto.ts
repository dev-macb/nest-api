import { PartialType } from '@nestjs/mapped-types';
import { CadastrarEventoCategoriaDto } from './cadastrar-evento-categoria.dto';

class AtualizarEventoCategoriaDto extends PartialType(CadastrarEventoCategoriaDto) { }

export { AtualizarEventoCategoriaDto };
