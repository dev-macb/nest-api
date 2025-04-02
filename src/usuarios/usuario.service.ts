import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SenhaUtil } from '../utils/senha.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { EntrarUsuarioDto } from './dto/entrar-usuario.dto';
import { CadastrarUsuarioDto } from './dto/cadastrar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';

@Injectable()
class UsuarioService {
    constructor (
        @InjectRepository(Usuario)
        private readonly repositorio: Repository<Usuario>
    ) { }

    async obterTodos(): Promise<Usuario[]> {
        return this.repositorio.find();
    }

    async obterPorId(id: number): Promise<Usuario | null> {
        return this.repositorio.findOneBy({ id });
    }

    async cadastrar(dto: CadastrarUsuarioDto): Promise<Usuario> {
        const usuario = this.repositorio.create(dto);

        usuario.senha = await SenhaUtil.gerarHash(dto.senha);

        return this.repositorio.save(usuario);
    }

    async atualizar(id: number, dto: AtualizarUsuarioDto): Promise<Usuario | null> {
        const usuario = await this.obterPorId(id);
        if (!usuario) return null;

        if (dto.senha) {
          usuario.senha = await SenhaUtil.gerarHash(dto.senha);
        }

        this.repositorio.merge(usuario, dto);

        return this.repositorio.save(usuario);
    }

    async remover(id: number): Promise<Usuario | null> {
        const administrador = await this.obterPorId(id);
        if (!administrador) return null;

        return this.repositorio.remove(administrador);
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
