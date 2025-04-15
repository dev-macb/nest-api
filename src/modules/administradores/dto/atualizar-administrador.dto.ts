import { PartialType } from '@nestjs/mapped-types';
import { CadastrarAdministradorDto } from './cadastrar-administrador.dto';

class AtualizarAdministradorDto extends PartialType(CadastrarAdministradorDto) {}

export { AtualizarAdministradorDto };
