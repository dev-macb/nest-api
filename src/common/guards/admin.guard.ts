import { TiposDeUsuario } from '../enums/TiposDeUsuarios';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
class AdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { tipo } = request.user;

        if (!tipo) {
            throw new ForbiddenException('Usuário não autenticado')
        };
        
        if (Number(tipo)!== TiposDeUsuario.ADMIN) {
            throw new ForbiddenException('Apenas administradores podem realizar esta ação');
        }

        return true;
    }
}

export { AdminGuard };
