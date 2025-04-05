import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { UsuarioModule } from './modules/usuarios/usuario.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
            TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'base.sqlite',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true // Para desenvolvimento
            }),
        UsuarioModule,
        DatabaseModule
    ],
    controllers: [],
    providers: [DatabaseService],
})
class AppModule {}

export { AppModule }
