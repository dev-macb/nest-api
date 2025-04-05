import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([Usuario]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_USUARIO'),
                signOptions: { expiresIn: '1h' },
            })
        })
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService, JwtStrategy],
    exports: [JwtStrategy]
})
class UsuarioModule {}

export { UsuarioModule };
