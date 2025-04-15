import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioGuard } from 'src/common/guards/usuario.guard';
import { UsuarioStrategy } from 'src/common/strategies/usuario.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_USUARIO'),
                signOptions: { expiresIn: '1h' },
            })
        }),
        PassportModule
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService, 
        UsuarioGuard, 
        UsuarioStrategy
    ],
    exports: [
        UsuarioService, 
        UsuarioGuard, 
        JwtModule
    ]
})
class UsuarioModule {}

export { UsuarioModule };
