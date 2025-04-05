import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { TiposDeUsuario } from 'src/common/enums/TiposDeUsuarios';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Injectable()
class DatabaseService {
    constructor (
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) { }
    
    async usuariosSeed() {
        await this.dataSource.transaction(async (base) => {
            const administrador = base.create(Usuario, {
                id: 1,
                tipo: TiposDeUsuario.ADMIN,
                nome: 'administrador',
                telefone: '(11) 1111-1111',
                email: 'administrador@email.com',
                senha: '$2b$10$NnyDjxjPa82hPUTyfBDqpeOyTbCQMAB4lx/wtjO6BXRmBm3ySQWKK',
                ativo: true,
                criadoEm: new Date(),
                atualizadoEm: new Date()
            });

            await base.save(administrador);
        });
    }
}

export { DatabaseService };
