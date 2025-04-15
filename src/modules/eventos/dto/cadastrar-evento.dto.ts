import { EStatusEvento } from 'src/common/enums/EStatusEvento';
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsNumber, Min, IsEnum } from 'class-validator';

class CadastrarEventoDto {
    @IsNotEmpty()
    @IsNumber()
    idOrganizador: number;

    @IsNotEmpty()
    @IsNumber()
    idEventoEndereco: number;

    @IsNotEmpty()
    @IsNumber()
    idCategoria: number;

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsOptional()
    @IsDateString()
    dataInicioInscricao?: string;

    @IsOptional()
    @IsDateString()
    dataFimInscricao?: string;

    @IsNotEmpty()
    @IsDateString()
    dataEvento: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    valorInscricao?: number;

    @IsOptional()
    @IsEnum(EStatusEvento)
    status?: EStatusEvento;
}

export { CadastrarEventoDto };