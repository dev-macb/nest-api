import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
class DatabaseService {
    constructor (
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) { }
    
    async usuariosSeed() {
        await this.dataSource.transaction(async (base) => {
            const kairos = base.create(Usuario, {
                id: 1,
                nome: 'Fulano da Silva',
                telefone: '(11) 1111-1111',
                email: 'fulano@email.com',
                senha: '$2b$10$NnyDjxjPa82hPUTyfBDqpeOyTbCQMAB4lx/wtjO6BXRmBm3ySQWKK',
                ativo: true,
                criadoEm: new Date(),
                atualizadoEm: new Date()
            });

            await base.save(kairos);
        });
    }
}

export { DatabaseService };
