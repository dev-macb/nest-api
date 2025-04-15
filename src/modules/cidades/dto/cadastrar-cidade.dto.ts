import { Transform } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

class CadastrarCidadeDto {
    @IsString({ message: 'O código IBGE deve ser uma string' })
    @Matches(/^\d+$/, { message: 'O código IBGE deve conter apenas números' })
    @Length(7, 7, { message: 'O código IBGE deve conter exatamente 7 dígitos' })
    codigoIbge: string;

    @IsString({ message: 'O nome deve ser uma string' })
    @Length(2, 100, { message: 'O nome deve conter entre 2 e 100 caracteres' })
    nome: string;

    @IsString({ message: 'O estado deve ser uma string' })
    @Length(2, 100, { message: 'O estado deve conter entre 2 e 100 caracteres' })
    estado: string;

    @IsString({ message: 'A sigla do estado deve ser uma string' })
    @Length(2, 2, { message: 'A sigla do estado deve conter exatamente 2 letras' })
    @Transform(({ value }) => value.toUpperCase().trim())
    estadoSigla: string;

    @IsString({ message: 'O país deve ser uma string' })
    @Length(2, 100, { message: 'O país deve conter entre 2 e 100 caracteres' })
    pais: string;
}

export { CadastrarCidadeDto };