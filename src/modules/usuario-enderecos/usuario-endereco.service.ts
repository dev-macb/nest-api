import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEndereco } from './entities/usuario-endereco.entity';
import { FiltrosUsuarioEnderecoDto } from './dto/filtros-usuario-endereco.dto';
import { CadastrarUsuarioEnderecoDto } from './dto/cadastrar-usuario-endereco.dto';
import { AtualizarUsuarioEnderecoDto } from './dto/atualizar-usuario-endereco.dto';


@Injectable()
class UsuarioEnderecoService {
    constructor(
        @InjectRepository(UsuarioEndereco)
        private readonly repositorio: Repository<UsuarioEndereco>,
    ) {}

    async obterTodos(filtros?: FiltrosUsuarioEnderecoDto): Promise<UsuarioEndereco[]> {
        const query = this.repositorio.createQueryBuilder('usuarioEndereco');
        
        if (filtros?.idCidade) {
            query.andWhere('usuarioEndereco.idCidade = :idCidade', { idCidade: filtros.idCidade });
        }

        if (filtros?.cep) {
            query.andWhere('usuarioEndereco.cep = :cep', { cep: filtros.cep });
        }

        if (filtros?.bairro) {
            query.andWhere('usuarioEndereco.bairro LIKE :bairro', { bairro: `%${filtros.bairro}%` });
        }

        return query.getMany();
    }

    async obterPorId(id: number): Promise<UsuarioEndereco | null> {
        return await this.repositorio.findOne({
            where: { id },
            relations: ['cidade'], // Carrega a cidade, se necessário
        });
    }

    async cadastrar(dto: CadastrarUsuarioEnderecoDto): Promise<UsuarioEndereco> {
        const usuarioEndereco = this.repositorio.create(dto);
        return this.repositorio.save(usuarioEndereco); 
    }

    async atualizar(id: number, dto: AtualizarUsuarioEnderecoDto): Promise<UsuarioEndereco | null> {
        const usuarioEndereco = await this.obterPorId(id);
        if (!usuarioEndereco) return null;

        this.repositorio.merge(usuarioEndereco, dto);
        return this.repositorio.save(usuarioEndereco);
    }

    async remover(id: number): Promise<UsuarioEndereco | null> {
        const usuarioEndereco = await this.obterPorId(id);
        if (!usuarioEndereco) return null;

        return this.repositorio.remove(usuarioEndereco);
    }
}

export { UsuarioEnderecoService };
