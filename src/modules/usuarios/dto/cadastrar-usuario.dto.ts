import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class CadastrarUsuarioDto {
    @IsString()
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    @MaxLength(255, { message: 'O nome não pode exceder 255 caracteres' })
    @Transform(({ value }) => value.trim())
    nome: string;

    @IsString()
    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Número de telefone inválido' }) 
    telefone: string;

    @IsEmail({}, { message: 'E-mail inválido' })
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;

    @IsString()
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    @MaxLength(100, { message: 'A senha não pode exceder 100 caracteres' })
    @Matches(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    @Matches(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula' })
    @Matches(/\d/, { message: 'A senha deve conter pelo menos um número' })
    @Matches(/[\W_]/, { message: 'A senha deve conter pelo menos um caractere especial' })
    senha: string;
}

export { CadastrarUsuarioDto };
