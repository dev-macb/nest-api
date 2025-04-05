import { Exclude } from 'class-transformer';
import { TiposDeUsuario } from 'src/common/enums/TiposDeUsuarios';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuarios')
class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: TiposDeUsuario, default: TiposDeUsuario.COMUM })
    tipo: TiposDeUsuario;

    @Column({ unique: true })
    nome: string;

    @Column()
    telefone: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    senha: string;

    @Column({ default: false })
    ativo: boolean;

    @CreateDateColumn()
    criadoEm: Date;

    @UpdateDateColumn()
    atualizadoEm: Date;
}

export { Usuario };
