import { IsString, IsOptional } from 'class-validator';

class FiltrosCidadeDto {
    @IsOptional()
    @IsString()
    nome?: string;
}

export { FiltrosCidadeDto }