import { JwtService } from '@nestjs/jwt';
import { ETabelas } from 'src/common/enums/ETabelas';
import { AdministradorService } from './administrador.service';
import { Administrador } from './entities/administrador.entity';
import { EAdministradores } from 'src/common/enums/EAdministradores';
import { Permissoes } from 'src/common/decorators/permissoes.decorator';
import { EntrarAdministradorDto } from './dto/entrar-administrador.dto';
import { CadastrarAdministradorDto } from './dto/cadastrar-administrador.dto';
import { AtualizarAdministradorDto } from './dto/atualizar-administrador.dto';
import { AdministradorGuard } from '../../common/guards/administrador.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UnauthorizedException, NotFoundException, UseGuards, InternalServerErrorException, ConflictException } from '@nestjs/common';

@Controller(ETabelas.ADMINISTRADORES)
class AdministradorController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: AdministradorService
    ) {}

    @Get()
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO, EAdministradores.ANJO)
    async obterTodos(): Promise<Omit<Administrador, 'senha'>[]> {
        return this.usuarioService.obterTodos();
    }

    @Get(':id')
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO, EAdministradores.ANJO)
    async obterPorId(@Param('id') id: number): Promise<Administrador | null> {
        const administrador = await this.usuarioService.obterPorId(id);
        if (!administrador) throw new NotFoundException('Administrador inexistente');

        return administrador;
    }

    @Post()
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO)
    async cadastrar(@Body() dto: CadastrarAdministradorDto): Promise<Omit<Administrador, 'senha'>> {
        const emailExistente = await this.usuarioService.obterPorEmail(dto.email);
        if (emailExistente) throw new ConflictException('E-mail em uso');

        const novoAdministrador = await this.usuarioService.cadastrar(dto);
        if (!novoAdministrador) throw new InternalServerErrorException('Erro ao cadastrar usuário')
        
        return novoAdministrador;
    }

    @Patch(':id')
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO)
    async atualizar(@Param('id') id: number, @Body() dto: AtualizarAdministradorDto): Promise<Omit<Administrador, 'senha'>> {
        const emailExistente = await this.usuarioService.obterPorEmail(dto.email);
        if (emailExistente) throw new ConflictException('E-mail em uso');

        const administradorAtualizado = await this.usuarioService.atualizar(id, dto);
        if (!administradorAtualizado) throw new NotFoundException('Administrador inexistente');

        return administradorAtualizado;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS)
    async remover(@Param('id') id: number): Promise<void> {
        const administrador = await this.usuarioService.remover(id);
        if (!administrador) throw new NotFoundException('Administrador inexistente');
    }

    @Post('entrar')
    @HttpCode(200)
    @Permissoes()
    async entrar(@Body() dto: EntrarAdministradorDto) {
        const administrador = await this.usuarioService.entrar(dto);
        if (!administrador) throw new UnauthorizedException('Credenciais inválidas');

        const payload = { id: administrador.id, tipo: administrador.tipo };
        const token = this.jwtService.sign(payload);

        return { tokenAdministrador: token };
    }
}

export { AdministradorController };
