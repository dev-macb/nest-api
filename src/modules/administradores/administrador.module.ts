import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AdministradorService } from './administrador.service';
import { Administrador } from './entities/administrador.entity';
import { AdministradorController } from './administrador.controller';
import { AdministradorGuard } from 'src/common/guards/administrador.guard';
import { AdministradorStrategy } from 'src/common/strategies/administrador.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([Administrador]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_ADMINISTRADOR'),
                signOptions: { expiresIn: '1h' },
            })
        }),
        PassportModule
    ],
    controllers: [
        AdministradorController
    ],
    providers: [
        AdministradorService, 
        AdministradorGuard, 
        AdministradorStrategy
    ],
    exports: [
        AdministradorService, 
        AdministradorGuard, 
        JwtModule
    ]
})
class AdministradorModule {}

export { AdministradorModule };
