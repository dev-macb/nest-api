import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuarios/usuario.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

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
