import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { SenhaUtil } from '../../common/utils/senha.util';
import { EntrarUsuarioDto } from './dto/entrar-usuario.dto';
import { FiltrosUsuarioDto } from './dto/filtros-usuario.dto.';
import { CadastrarUsuarioDto } from './dto/cadastrar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';

@Injectable()
class UsuarioService {
    constructor (
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ) { }

    async obterTodos(filtros?: FiltrosUsuarioDto): Promise<Omit<Usuario, 'senha'>[]> {
        const query = this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.endereco', 'endereco');

        if (filtros?.nome) {
            query.andWhere('usuario.nomeCompleto LIKE :nome', { nome: `%${filtros.nome}%` });
        }

        if (filtros?.ativo !== undefined) {
            query.andWhere('usuario.ativo = :ativo', { ativo: filtros.ativo });
        }

        const usuarios = await query.getMany();

        return usuarios.map(({ senha, ...usuarioSemSenha }) => usuarioSemSenha);
    }

    async obterPorId(id: number): Promise<Omit<Usuario, 'senha'> | null> {
        const usuario = await this.usuarioRepository.findOne({ 
            where: { id },
            relations: ['endereco']
        });

        if (!usuario) return null;

        const { senha, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }

    async obterPorEmail(email: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({ 
            where: { email },
            relations: ['endereco']
        });
    }

    async cadastrar(dto: CadastrarUsuarioDto): Promise<Omit<Usuario, 'senha'>> {
        const usuario = this.usuarioRepository.create(dto);
        usuario.senha = await SenhaUtil.gerarHash(dto.senha);

        const usuarioSalvo = await this.usuarioRepository.save(usuario);
        const { senha, ...usuarioSemSenha } = usuarioSalvo;
        
        return usuarioSemSenha;
    }

    async atualizar(id: number, dto: AtualizarUsuarioDto): Promise<Omit<Usuario, 'senha'> | null> {
        const usuario = await this.usuarioRepository.findOne({ 
            where: { id },
            relations: ['endereco']
        });

        if (!usuario) return null;

        if (dto.senha) {
            usuario.senha = await SenhaUtil.gerarHash(dto.senha);
        }

        this.usuarioRepository.merge(usuario, dto);
        const usuarioAtualizado = await this.usuarioRepository.save(usuario);
        const { senha, ...usuarioSemSenha } = usuarioAtualizado;

        return usuarioSemSenha;
    }

    async remover(id: number): Promise<Omit<Usuario, 'senha'> | null> {
        const usuario = await this.usuarioRepository.findOne({ 
            where: { id },
            relations: ['endereco']
        });

        if (!usuario) return null;

        await this.usuarioRepository.remove(usuario);
        const { senha, ...usuarioSemSenha } = usuario;

        return usuarioSemSenha;
    }

    async entrar(dto: EntrarUsuarioDto): Promise<Omit<Usuario, 'senha'> | null> {
        const usuario = await this.obterPorEmail(dto.email);
        if (!usuario) return null;
        
        const senhaCorreta = await SenhaUtil.validarHash(dto.senha, usuario.senha);
        if (!senhaCorreta) return null;

        const { senha, ...usuarioSemSenha } = usuario;

        return usuarioSemSenha;
    }
}

export { UsuarioService };
