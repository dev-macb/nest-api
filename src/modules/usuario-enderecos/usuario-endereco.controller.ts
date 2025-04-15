import { ETabelas } from 'src/common/enums/ETabelas';
import { UsuarioEnderecoService } from './usuario-endereco.service';
import { UsuarioEndereco } from './entities/usuario-endereco.entity';
import { EAdministradores } from 'src/common/enums/EAdministradores';
import { Permissoes } from 'src/common/decorators/permissoes.decorator';
import { AdministradorGuard } from '../../common/guards/administrador.guard';
import { CadastrarUsuarioEnderecoDto } from './dto/cadastrar-usuario-endereco.dto';
import { AtualizarUsuarioEnderecoDto } from './dto/atualizar-usuario-endereco.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, UseGuards, InternalServerErrorException } from '@nestjs/common';

@Controller(ETabelas.USUARIO_ENDERECOS)
class UsuarioEnderecoController {
    constructor(
        private readonly usuarioEnderecoService: UsuarioEnderecoService
    ) {}

    @Get()
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO, EAdministradores.ANJO)
    async obterTodos(): Promise<UsuarioEndereco[]> {
        return this.usuarioEnderecoService.obterTodos();
    }

    @Get(':id')
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO, EAdministradores.ANJO)
    async obterPorId(@Param('id') id: number): Promise<UsuarioEndereco | null> {
        const usuarioEndereco = await this.usuarioEnderecoService.obterPorId(id);
        if (!usuarioEndereco) throw new NotFoundException('Endereço inexistente');

        return usuarioEndereco;
    }

    @Post()
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO)
    async cadastrar(@Body() dto: CadastrarUsuarioEnderecoDto): Promise<UsuarioEndereco> {
        const novoUsuarioEndereco = await this.usuarioEnderecoService.cadastrar(dto);
        if (!novoUsuarioEndereco) throw new InternalServerErrorException('Erro ao cadastrar Endereço');

        return novoUsuarioEndereco;
    }

    @Patch(':id')
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO)
    async atualizar(@Param('id') id: number, @Body() dto: AtualizarUsuarioEnderecoDto): Promise<UsuarioEndereco> {
        const usuarioEnderecoAtualizado = await this.usuarioEnderecoService.atualizar(id, dto);
        if (!usuarioEnderecoAtualizado) throw new NotFoundException('Endereço inexistente');

        return usuarioEnderecoAtualizado;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS)
    async remover(@Param('id') id: number): Promise<void> {
        const usuarioEndereco = await this.usuarioEnderecoService.remover(id);
        if (!usuarioEndereco) throw new NotFoundException('Endereço inexistente');
    }
}

export { UsuarioEnderecoController };
