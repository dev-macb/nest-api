import { IsOptional, IsBoolean, IsString } from 'class-validator';

class FiltrosUsuarioDto {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsBoolean()
    ativo?: boolean;
}

export { FiltrosUsuarioDto }