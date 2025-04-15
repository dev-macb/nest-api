import { ETabelas } from "src/common/enums/ETabelas";
import { Cidade } from "src/modules/cidades/entities/cidade.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity(ETabelas.USUARIO_ENDERECOS)
class UsuarioEndereco {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'id_cidade' })
    idCidade: number;
  
    @Column({ length: 8 })
    cep: string;
  
    @Column({ length: 255 })
    logradouro: string;
  
    @Column({ length: 100, nullable: true })
    complemento: string | null;

    @Column({ length: 10 })
    numero: string;

    @Column({ length: 100 })
    bairro: string;

    @Column('decimal', { precision: 10, scale: 7, nullable: true })
    latitude: number | null;

    @Column('decimal', { precision: 10, scale: 7, nullable: true })
    longitude: number | null;

    @UpdateDateColumn({ name: 'criado_em' })
    criadoEm: Date;

    @CreateDateColumn({ name: 'atualizado_em' })
    atualizadoEm: Date;

    @ManyToOne(() => Cidade, { eager: true })
    @JoinColumn({ name: 'id_cidade' })
    cidade: Cidade;
}

export { UsuarioEndereco };
