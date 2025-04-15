import { CidadeService } from './cidade.service';
import { Cidade } from './entities/cidade.entity';
import { CadastrarCidadeDto } from './dto/cadastrar-cidade.dto';
import { AtualizarCidadeDto } from './dto/atualizar-cidade.dto';
import { EAdministradores } from 'src/common/enums/EAdministradores';
import { Permissoes } from 'src/common/decorators/permissoes.decorator';
import { AdministradorGuard } from '../../common/guards/administrador.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { ETabelas } from 'src/common/enums/ETabelas';

@Controller(ETabelas.CIDADES)
class CidadeController {
    constructor(
        private readonly cidadeService: CidadeService
    ) {}

    @Get()
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO, EAdministradores.ANJO)
    async obterTodos(): Promise<Cidade[]> {
        return this.cidadeService.obterTodos();
    }

    @Get(':id')
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO, EAdministradores.ANJO)
    async obterPorId(@Param('id') id: number): Promise<Cidade | null> {
        const cidade = await this.cidadeService.obterPorId(id);
        if (!cidade) throw new NotFoundException('Cidade inexistente');

        return cidade;
    }

    @Post()
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO)
    async cadastrar(@Body() dto: CadastrarCidadeDto): Promise<Cidade> {
        const novaCidade = await this.cidadeService.cadastrar(dto);
        if (!novaCidade) throw new InternalServerErrorException('Erro ao cadastrar Cidade')
        
        return novaCidade;
    }

    @Patch(':id')
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS, EAdministradores.ARCANJO)
    async atualizar(@Param('id') id: number, @Body() dto: AtualizarCidadeDto): Promise<Cidade> {
        const cidadeAtualizada = await this.cidadeService.atualizar(id, dto);
        if (!cidadeAtualizada) throw new NotFoundException('Cidade inexistente');

        return cidadeAtualizada;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AdministradorGuard)
    @Permissoes(EAdministradores.DEUS)
    async remover(@Param('id') id: number): Promise<void> {
        const cidade = await this.cidadeService.remover(id);
        if (!cidade) throw new NotFoundException('Cidade inexistente');
    }
}

export { CidadeController };
