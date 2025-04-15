import { IsNotEmpty, IsString, IsNumber, IsOptional, Length, IsDecimal, ValidateNested } from 'class-validator';

class CadastrarUsuarioEnderecoDto {
    @IsNumber()
    @IsNotEmpty()
    idCidade: number;

    @IsString()
    @Length(8, 8)
    @IsNotEmpty()
    cep: string;
  
    @IsString()
    @Length(3, 255)
    @IsNotEmpty()
    logradouro: string;
  
    @IsString()
    @Length(0, 100)
    @IsOptional()
    complemento?: string | null = null;

    @IsString()
    @Length(1, 10)
    @IsNotEmpty()
    numero: string;

    @IsString()
    @Length(3, 100)
    @IsNotEmpty()
    bairro: string;

    @IsDecimal()
    @IsOptional()
    latitude?: number | null = null;

    @IsDecimal()
    @IsOptional()
    longitude?: number | null = null;
}

export { CadastrarUsuarioEnderecoDto };
