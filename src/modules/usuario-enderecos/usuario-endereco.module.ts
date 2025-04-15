import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEnderecoService } from './usuario-endereco.service';
import { UsuarioEndereco } from './entities/usuario-endereco.entity';
import { UsuarioEnderecoController } from './usuario-endereco.controller';
import { AdministradorModule } from '../administradores/administrador.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsuarioEndereco]),
        AdministradorModule
    ],
    controllers: [UsuarioEnderecoController],
    providers: [UsuarioEnderecoService],
})
class UsuarioEnderecoModule {}

export { UsuarioEnderecoModule };
