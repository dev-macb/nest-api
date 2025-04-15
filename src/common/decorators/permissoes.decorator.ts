import { SetMetadata } from '@nestjs/common';

const PERMISSOES_KEY = 'permissoes';
const Permissoes = (...permissoes: number[]) => SetMetadata(PERMISSOES_KEY, permissoes);

export { Permissoes, PERMISSOES_KEY };