import { Type } from 'class-transformer';
import { ESexos } from '../../../common/enums/ESexos';
import { EUsuarios } from '../../../common/enums/EUsuarios';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

class CadastrarUsuarioDto {
    @IsEnum(EUsuarios)
    @IsOptional()
    tipo?: EUsuarios = EUsuarios.COMUM;

    @IsString()
    @Length(11, 11)
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @Length(5, 255)
    @IsNotEmpty()
    nomeCompleto: string;

    @IsDate()
    @Type(() => Date)
    nascimento: Date;

    @IsEnum(ESexos)
    @IsOptional()
    sexo: ESexos;

    @IsBoolean()
    @IsOptional()
    pcd: boolean;

    @IsString()
    @IsOptional()
    @Length(0, 100)
    equipe?: string | null = null;

    @IsString()
    @IsOptional()
    @Length(10, 20)
    telefone?: string | null = null;

    @IsEmail()
    @Length(5, 255)
    email: string;

    @IsString()
    @Length(8, 255)
    senha: string;

    @IsBoolean()
    @IsOptional()
    ativo?: boolean = true;
}

export { CadastrarUsuarioDto };
