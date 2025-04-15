import { ETabelas } from 'src/common/enums/ETabelas';
import { EStatusEvento } from 'src/common/enums/EStatusEvento';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity(ETabelas.EVENTOS)
class Evento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_usuario' })
    idOrganizador: number;

    @Column({ name: 'id_evento_endereco' })
    idEventoEndereco: number;

    @Column({ name: 'id_usuario' })
    idCategoria: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ type: 'text' })
    descricao: string;

    @Column({ nullable: true })
    dataInicioInscricao: Date;

    @Column({ nullable: true })
    dataFimInscricao: Date;

    @Column({ type: 'datetime' })
    dataEvento: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    valorInscricao: number;

    @Column({ type: 'enum', enum: EStatusEvento, default: EStatusEvento.PLANEJAMENTO })
    status: EStatusEvento;

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn({ name: 'criado_em' })
    criadoEm: Date;

    @UpdateDateColumn({ name: 'atualizado_em' })
    atualizadoEm: Date;
}

export { Evento };