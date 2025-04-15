import { PartialType } from '@nestjs/mapped-types';
import { CadastrarUsuarioEnderecoDto } from './cadastrar-usuario-endereco.dto';

class AtualizarUsuarioEnderecoDto extends PartialType(CadastrarUsuarioEnderecoDto) { }

export { AtualizarUsuarioEnderecoDto };
