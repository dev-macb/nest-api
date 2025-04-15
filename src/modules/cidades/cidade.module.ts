import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadeService } from './cidade.service';
import { Cidade } from './entities/cidade.entity';
import { CidadeController } from './cidade.controller';
import { AdministradorModule } from '../administradores/administrador.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cidade]),
        AdministradorModule
    ],
    controllers: [CidadeController],
    providers: [CidadeService],
    exports: [CidadeService]
})
class CidadeModule {}

export { CidadeModule };
