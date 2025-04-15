import { join } from 'path';
import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Cidade } from 'src/modules/cidades/entities/cidade.entity';
import { Administrador } from 'src/modules/administradores/entities/administrador.entity';

@Injectable()
class DatabaseService {
    constructor (
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) { }
    
    async administradoresSeed() {
        await this.dataSource.transaction(async (base) => {
            const administradores: Partial<Administrador>[] = [
                {
                    id: 1,
                    tipo: 1,
                    nomeCompleto: 'kairos',
                    telefone: '(11) 1111-1111',
                    email: 'kairos@email.com',
                    senha: process.env.SENHA_PADRAO_ADMINISTRADOR,
                    ativo: true,
                    criadoEm: new Date(),
                    atualizadoEm: new Date(),
                },
                {
                    id: 2,
                    tipo: 2,
                    nomeCompleto: 'miguel',
                    telefone: '(22) 2222-2222',
                    email: 'miguel@email.com',
                    senha: process.env.SENHA_PADRAO_ADMINISTRADOR,
                    ativo: true,
                    criadoEm: new Date(),
                    atualizadoEm: new Date(),
                },
            ];
    
            const seeds = administradores.map((data) => base.create(Administrador, data));
            await base.save(seeds);
            console.log(`[*] administradoresSeed: { ${seeds.length} } registros inseridos na tabela administradores.`);
        });
    }

    async cidadesSeed() {    
        const caminhoDoArquivo = join(process.cwd(), 'src', 'database', 'seeds', 'cidades.json');
        
        try {
            const json = readFileSync(caminhoDoArquivo, 'utf8');
            const cidades = JSON.parse(json);
            
            await this.dataSource.transaction(async (bancoDeDados) => {
                const seeds = cidades.map((cidade: Cidade) =>
                    bancoDeDados.create(Cidade, cidade)
                );
                await bancoDeDados.save(seeds);
            });
    
            console.log(`[*] cidadesSeed: { ${cidades.length} } registros inseridos na tabela cidades.`);
        }
        catch (erro) {
            console.error('[!] Erro ao inserir cidades:\n', erro);
        }
    }
}

export { DatabaseService };
