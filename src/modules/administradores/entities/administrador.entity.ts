import { Exclude } from 'class-transformer';
import { ETabelas } from 'src/common/enums/ETabelas';
import { EAdministradores } from '../../../common/enums/EAdministradores';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity(ETabelas.ADMINISTRADORES)
class Administrador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: EAdministradores, default: EAdministradores.ANJO })
    tipo: EAdministradores;

    @Column({ unique: true })
    nomeCompleto: string;

    @Column()
    telefone: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    senha: string;

    @Column({ default: false })
    ativo: boolean;

    @UpdateDateColumn({ name: 'criado_em' })
    criadoEm: Date;

    @CreateDateColumn({ name: 'atualizado_em' })
    atualizadoEm: Date;
}

export { Administrador };
