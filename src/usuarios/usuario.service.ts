import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SenhaUtil } from '../utils/senha.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { EntrarUsuarioDto } from './dto/entrar-usuario.dto';
import { FiltrosUsuarioDto } from './dto/filtros-usuario.dto';
import { CadastrarUsuarioDto } from './dto/cadastrar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';

@Injectable()
class UsuarioService {
    constructor (
        @InjectRepository(Usuario)
        private readonly repositorio: Repository<Usuario>
    ) { }

    async obterTodos(filtros?: FiltrosUsuarioDto): Promise<Omit<Usuario, 'senha'>[]> {
        const query = this.repositorio.createQueryBuilder('usuario');
    
        if (filtros?.nome) {
            query.andWhere('usuario.nome LIKE :nome', { nome: `%${filtros.nome}%` });
        }
    
        if (filtros?.ativo !== undefined) {
            query.andWhere('usuario.ativo = :ativo', { ativo: filtros.ativo });
        }
    
        const usuarios = await query.getMany();
    
        return usuarios.map(({ senha, ...usuarioSemSenha }) => usuarioSemSenha);
    }

    async obterPorId(id: number): Promise<Usuario | null> {
        const usuario = await this.repositorio.findOneBy({ id });
        if (!usuario) return null;
    
        return usuario;
    }

    async cadastrar(dto: CadastrarUsuarioDto): Promise<Omit<Usuario, 'senha'>> {
        const usuario = this.repositorio.create(dto);

        usuario.senha = await SenhaUtil.gerarHash(dto.senha);

        const usuarioSalvo = await this.repositorio.save(usuario);

        const { senha, ...usuarioSemSenha } = usuarioSalvo;
        return usuarioSemSenha;
    }

    async atualizar(id: number, dto: AtualizarUsuarioDto): Promise<Omit<Usuario, 'senha'> | null> {
        const usuario = await this.obterPorId(id);
        if (!usuario) return null;

        if (dto.senha) {
          usuario.senha = await SenhaUtil.gerarHash(dto.senha);
        }

        this.repositorio.merge(usuario, dto);

        const usuarioSalvo = await this.repositorio.save(usuario);

        const { senha, ...usuarioSemSenha } = usuarioSalvo;
        return usuarioSemSenha;
    }

    async remover(id: number): Promise<Usuario | null> {
        const usuario = await this.obterPorId(id);
        if (!usuario) return null;

        return this.repositorio.remove(usuario);
    }

    async entrar(dto: EntrarUsuarioDto): Promise<Usuario | null> {
        const usuario = await this.repositorio.findOneBy({ email: dto.email });
        if (!usuario) return null;

        const senhaCorreta = await SenhaUtil.validarHash(dto.senha, usuario.senha);
        if (!senhaCorreta) return null;

        return usuario;
    }
}

export { UsuarioService };
