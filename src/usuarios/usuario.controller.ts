import { JwtService } from '@nestjs/jwt';
import { UsuarioGuard } from './usuario.guard';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { EntrarUsuarioDto } from './dto/entrar-usuario.dto';
import { CadastrarUsuarioDto } from './dto/cadastrar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UnauthorizedException, NotFoundException, UseGuards, InternalServerErrorException, BadRequestException } from '@nestjs/common';

@Controller('usuarios')
class UsuarioController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService
    ) {}

    @Get()
    @UseGuards(UsuarioGuard)
    async obterTodos(): Promise<Omit<Usuario, 'senha'>[]> {
        return this.usuarioService.obterTodos();
    }

    @Get(':id')
    @UseGuards(UsuarioGuard)
    async obterPorId(@Param('id') id: number): Promise<Usuario | null> {
        const usuario = this.usuarioService.obterPorId(id);
        if (!usuario) throw new NotFoundException('Usuário inexistente');

        return usuario;
    }

    @Post()
    @UseGuards(UsuarioGuard)
    async cadastrar(@Body() dto: CadastrarUsuarioDto): Promise<Omit<Usuario, 'senha'>> {
        const novoUsuario = this.usuarioService.cadastrar(dto);
        if (!novoUsuario) throw new InternalServerErrorException('Erro ao cadastrar usuário')
        
        return novoUsuario;
    }

    @Patch(':id')
    @UseGuards(UsuarioGuard)
    async atualizar(@Param('id') id: number, @Body() dto: AtualizarUsuarioDto): Promise<Omit<Usuario, 'senha'>> {
        const usuario = await this.usuarioService.atualizar(id, dto);
        if (!usuario) throw new NotFoundException('Usuário inexistente');

        return usuario;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(UsuarioGuard)
    async remover(@Param('id') id: number): Promise<void> {
        const usuario = await this.usuarioService.remover(id);
        if (!usuario) throw new NotFoundException('Usuário inexistente');
    }

    @Post('entrar')
    @HttpCode(200)
    async entrar(@Body() dto: EntrarUsuarioDto) {
        const usuario = await this.usuarioService.entrar(dto);
        if (!usuario) throw new UnauthorizedException('Credenciais inválidas');

        const payload = { idAdministrador: usuario.id };
        const token = this.jwtService.sign(payload);

        return { kairosTokenAdministrardor: token };
    }
}

export { UsuarioController };
