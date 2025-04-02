import * as bcrypt from 'bcrypt';

class SenhaUtil {
    private static readonly COMPLEXIDADE_SALT = 10;

    static async gerarHash(senha: string): Promise<string> {
        return bcrypt.hash(senha, this.COMPLEXIDADE_SALT);
    }

    static async validarHash(senha: string, senhaHash: string): Promise<boolean> {
        return bcrypt.compare(senha, senhaHash);
    }
}

export { SenhaUtil };
