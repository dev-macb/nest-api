import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { ETabelas } from 'src/common/enums/ETabelas';
import { EntrarUsuarioDto } from './dto/entrar-usuario.dto';
import { CadastrarUsuarioDto } from './dto/cadastrar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { EAdministradores } from 'src/common/enums/EAdministradores';
import { Permissoes } from 'src/common/decorators/permissoes.decorator';
import { AdministradorGuard } from '../../common/guards/administrador.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UnauthorizedException, NotFoundException, UseGuards, InternalServerErrorException, ConflictException } from '@nestjs/common';

@Controller(ETabelas.USUARIOS)
class UsuarioController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService
    ) {}

    @Get()
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO, EAdministradores.ANJO)
    async obterTodos(): Promise<Omit<Usuario, 'senha'>[]> {
        return this.usuarioService.obterTodos();
    }

    @Get(':id')
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO, EAdministradores.ANJO)
    async obterPorId(@Param('id') id: number): Promise<Omit<Usuario, 'senha'> | Usuario | null> {
        const usuario = await this.usuarioService.obterPorId(id);
        if (!usuario) throw new NotFoundException('Usuario inexistente');

        return usuario;
    }

    @Post()
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO)
    async cadastrar(@Body() dto: CadastrarUsuarioDto): Promise<Omit<Usuario, 'senha'>> {
        const emailExistente = await this.usuarioService.obterPorEmail(dto.email);
        if (emailExistente) throw new ConflictException('E-mail em uso');

        const novoUsuario = await this.usuarioService.cadastrar(dto);
        if (!novoUsuario) throw new InternalServerErrorException('Erro ao cadastrar usuário')
        
        return novoUsuario;
    }

    @Patch(':id')
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO)
    async atualizar(@Param('id') id: number, @Body() dto: AtualizarUsuarioDto): Promise<Omit<Usuario, 'senha'>> {
        const emailExistente = await this.usuarioService.obterPorEmail(dto.email);
        if (emailExistente) throw new ConflictException('E-mail em uso');

        const usuarioAtualizado = await this.usuarioService.atualizar(id, dto);
        if (!usuarioAtualizado) throw new NotFoundException('Usuario inexistente');

        return usuarioAtualizado;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS)
    async remover(@Param('id') id: number): Promise<void> {
        const usuario = await this.usuarioService.remover(id);
        if (!usuario) throw new NotFoundException('Usuario inexistente');
    }

    @Post('entrar')
    @HttpCode(200)
    @Permissoes()
    async entrar(@Body() dto: EntrarUsuarioDto) {
        const usuario = await this.usuarioService.entrar(dto);
        if (!usuario) throw new UnauthorizedException('Credenciais inválidas');

        const payload = { id: usuario.id, tipo: usuario.tipo };
        const token = this.jwtService.sign(payload);

        return { tokenUsuario: token };
    }
}

export { UsuarioController };
