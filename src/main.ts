import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { existsSync, unlinkSync } from 'fs';
import { DatabaseService } from './database/database.service';
import { config } from 'dotenv';

async function bootstrap() {
    config();

    const baseDeDados = 'base.sqlite';
    if (existsSync(baseDeDados)) unlinkSync(baseDeDados);

    const app = await NestFactory.create(AppModule);

    const databaseService = app.get(DatabaseService);
    await databaseService.administradoresSeed();
    await databaseService.cidadesSeed();

    await app.listen(process.env.API_PORTA ?? 3000);
}

bootstrap();
