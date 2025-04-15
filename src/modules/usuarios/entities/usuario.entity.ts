import { Exclude } from 'class-transformer';
import { ESexos } from 'src/common/enums/ESexos';
import { ETabelas } from 'src/common/enums/ETabelas';
import { EUsuarios } from 'src/common/enums/EUsuarios';
import { UsuarioEndereco } from 'src/modules/usuario-enderecos/entities/usuario-endereco.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity(ETabelas.USUARIOS)
class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_usuario_endereco', nullable: true })
    idEndereco: number;

    @Column({ enum: EUsuarios, default: EUsuarios.COMUM })
    tipo: EUsuarios;

    @Column({ length: 11, unique: true })
    cpf: string;

    @Column({ length: 255 })
    nomeCompleto: string;

    @Column({ type: Date })
    nascimento: Date;

    @Column({ enum: ESexos, default: ESexos.OUTRO })
    sexo: ESexos;

    @Column()
    pcd: boolean;

    @Column({ length: 100, nullable: true })
    equipe: string | null;

    @Column({ length: 20, nullable: true })
    telefone: string | null;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 255 })
    @Exclude()
    senha: string;

    @Column({ default: true })
    ativo: boolean;

    @UpdateDateColumn({ name: 'criado_em' })
    criadoEm: Date;

    @CreateDateColumn({ name: 'atualizado_em' })
    atualizadoEm: Date;

    @OneToOne(() => UsuarioEndereco, { cascade: true, eager: true, nullable: true })
    @JoinColumn({ name: 'id_usuario_endereco' })
    endereco: UsuarioEndereco;
}

export { Usuario };
