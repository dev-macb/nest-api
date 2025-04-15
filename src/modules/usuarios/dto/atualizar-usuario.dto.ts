import { PartialType } from '@nestjs/mapped-types';
import { CadastrarUsuarioDto } from './cadastrar-usuario.dto';

class AtualizarUsuarioDto extends PartialType(CadastrarUsuarioDto) { }

export { AtualizarUsuarioDto };
