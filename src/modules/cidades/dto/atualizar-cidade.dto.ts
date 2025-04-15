import { PartialType } from '@nestjs/mapped-types';
import { CadastrarCidadeDto } from './cadastrar-cidade.dto';

class AtualizarCidadeDto extends PartialType(CadastrarCidadeDto) {}

export { AtualizarCidadeDto };
