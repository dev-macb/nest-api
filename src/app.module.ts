import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';
import { CidadeModule } from './modules/cidades/cidade.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { AdministradorModule } from './modules/administradores/administrador.module';
import { UsuarioEnderecoModule } from './modules/usuario-enderecos/usuario-endereco.module';
import { EventosModule } from './modules/eventos/eventos.module';
import { EventoCategoriaModule } from './modules/evento-categoria/evento-categoria.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'base.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true // Para desenvolvimento
        }),
        AdministradorModule,
        CidadeModule,
        UsuarioModule,
        UsuarioEnderecoModule,
        EventosModule,
        EventoCategoriaModule,
    ],
    controllers: [],
    providers: [DatabaseService],
})
class AppModule {}

export { AppModule };
