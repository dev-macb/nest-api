import { Module } from '@nestjs/common';
import { EventoCategoriaService } from './evento-categoria.service';
import { EventoCategoriaController } from './evento-categoria.controller';

@Module({
  controllers: [EventoCategoriaController],
  providers: [EventoCategoriaService],
})
export class EventoCategoriaModule {}
