import { IsOptional, IsBoolean, IsString } from 'class-validator';

class FiltrosAdministradorDto {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsBoolean()
    ativo?: boolean;
}

export { FiltrosAdministradorDto }