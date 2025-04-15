import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SenhaUtil } from '../../common/utils/senha.util';
import { Administrador } from './entities/administrador.entity';
import { EntrarAdministradorDto } from './dto/entrar-administrador.dto';
import { FiltrosAdministradorDto } from './dto/filtros-administrador.dto';
import { CadastrarAdministradorDto } from './dto/cadastrar-administrador.dto';
import { AtualizarAdministradorDto } from './dto/atualizar-administrador.dto';

@Injectable()
class AdministradorService {
    constructor (
        @InjectRepository(Administrador)
        private readonly repositorio: Repository<Administrador>
    ) { }

    async obterTodos(filtros?: FiltrosAdministradorDto): Promise<Omit<Administrador, 'senha'>[]> {
        const query = this.repositorio.createQueryBuilder('administrador');
    
        if (filtros?.nome) {
            query.andWhere('administrador.nome LIKE :nome', { nome: `%${filtros.nome}%` });
        }
    
        if (filtros?.ativo !== undefined) {
            query.andWhere('administrador.ativo = :ativo', { ativo: filtros.ativo });
        }
    
        const usuarios = await query.getMany();
    
        return usuarios.map(({ senha, ...usuarioSemSenha }) => usuarioSemSenha);
    }

    async obterPorId(id: number): Promise<Administrador | null> {
        const administrador = await this.repositorio.findOneBy({ id });
        if (!administrador) return null;
    
        return administrador;
    }

    async obterPorEmail(email: string): Promise<Administrador | null> {
        const administrador = await this.repositorio.findOneBy({ email });
        if (!administrador) return null;
    
        return administrador;
    }

    async cadastrar(dto: CadastrarAdministradorDto): Promise<Omit<Administrador, 'senha'>> {
        const administrador = this.repositorio.create(dto);

        administrador.senha = await SenhaUtil.gerarHash(dto.senha);

        const usuarioSalvo = await this.repositorio.save(administrador);

        const { senha, ...usuarioSemSenha } = usuarioSalvo;
        return usuarioSemSenha;
    }

    async atualizar(id: number, dto: AtualizarAdministradorDto): Promise<Omit<Administrador, 'senha'> | null> {
        const administrador = await this.obterPorId(id);
        if (!administrador) return null;

        if (dto.senha) {
          administrador.senha = await SenhaUtil.gerarHash(dto.senha);
        }

        this.repositorio.merge(administrador, dto);

        const usuarioSalvo = await this.repositorio.save(administrador);

        const { senha, ...usuarioSemSenha } = usuarioSalvo;
        return usuarioSemSenha;
    }

    async remover(id: number): Promise<Administrador | null> {
        const administrador = await this.obterPorId(id);
        if (!administrador) return null;

        return this.repositorio.remove(administrador);
    }

    async entrar(dto: EntrarAdministradorDto): Promise<Administrador | null> {
        const administrador = await this.obterPorEmail(dto.email);
        if (!administrador) return null;
        
        const senhaCorreta = await SenhaUtil.validarHash(dto.senha, administrador.senha);
        if (!senhaCorreta) return null;

        return administrador;
    }
}

export { AdministradorService };
