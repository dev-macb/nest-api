import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { UsuarioStrategy } from './usuario.strategy';
import { UsuarioController } from './usuario.controller';

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([Usuario]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_USUARIO'),
                signOptions: { expiresIn: '60s' },
            })
        })
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioStrategy],
    exports: [UsuarioStrategy]
})
class UsuarioModule {}

export { UsuarioModule };
