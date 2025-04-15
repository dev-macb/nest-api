import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cidade } from './entities/cidade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FiltrosCidadeDto } from './dto/filtros-cidade.dto';
import { CadastrarCidadeDto } from './dto/cadastrar-cidade.dto';
import { AtualizarCidadeDto } from './dto/atualizar-cidade.dto';

@Injectable()
class CidadeService {
    constructor (
        @InjectRepository(Cidade)
        private readonly repositorio: Repository<Cidade>
    ) { }

    async obterTodos(filtros?: FiltrosCidadeDto): Promise<Cidade[]> {
        const query = this.repositorio.createQueryBuilder('cidade');
    
        if (filtros?.nome) {
            query.andWhere('cidade.nome LIKE :nome', { nome: `%${filtros.nome}%` });
        }
    
        return query.getMany();
    }

    async obterPorId(id: number): Promise<Cidade | null> {
        const cidade = await this.repositorio.findOneBy({ id });
        if (!cidade) return null;
    
        return cidade;
    }
    
    async cadastrar(dto: CadastrarCidadeDto): Promise<Cidade> {
        const cidade = this.repositorio.create(dto);
        return this.repositorio.save(cidade);
    }

    async atualizar(id: number, dto: AtualizarCidadeDto): Promise<Cidade | null> {
        const cidade = await this.obterPorId(id);
        if (!cidade) return null;

        this.repositorio.merge(cidade, dto);
        const cidadeAtualizada = await this.repositorio.save(cidade);

        return cidadeAtualizada;
    }

    async remover(id: number): Promise<Cidade | null> {
        const cidade = await this.obterPorId(id);
        if (!cidade) return null;

        return this.repositorio.remove(cidade);
    }
}

export { CidadeService };
