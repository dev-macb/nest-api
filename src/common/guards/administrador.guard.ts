import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { EAdministradores } from '../enums/EAdministradores';
import { PERMISSOES_KEY } from '../decorators/permissoes.decorator';

@Injectable()
class AdministradorGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {
        super();
    }
    
    async canActivate(contexto: ExecutionContext): Promise<boolean> {
        const requisicao = contexto.switchToHttp().getRequest();
        const token = requisicao.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new ForbiddenException('Token não fornecido');
        }
        
        try {
            const { tipo } = this.jwtService.verify(token);
            
            const permissoesRequeridas = this.reflector.get<EAdministradores[]>(PERMISSOES_KEY, contexto.getHandler());
            if (!permissoesRequeridas) {
                return true;
            }

            const possuiPermissao = permissoesRequeridas.includes(tipo);
            if (!possuiPermissao) {
                throw new ForbiddenException('Você não tem permissão para acessar este recurso');
            }

            return true
        }
        catch (erro) {
            if (erro instanceof ForbiddenException) {
                throw erro;
            }
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }
}

export { AdministradorGuard };
