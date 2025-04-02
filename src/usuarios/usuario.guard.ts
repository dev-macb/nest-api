import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
class UsuarioGuard extends AuthGuard('jwt') { }

export { UsuarioGuard };
