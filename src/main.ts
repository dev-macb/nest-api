import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { existsSync, unlinkSync } from 'fs';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
    const baseDeDados = 'base.sqlite';
    if (existsSync(baseDeDados)) unlinkSync(baseDeDados);

    const app = await NestFactory.create(AppModule);

    const databaseService = app.get(DatabaseService);
    await databaseService.usuariosSeed();

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
