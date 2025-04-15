import { ETabelas } from 'src/common/enums/ETabelas';
import { Entity, Column, PrimaryGeneratedColumn,} from 'typeorm';
  
@Entity(ETabelas.CIDADES)
class Cidade {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    nome: string;
  
    @Column({ length: 100 })
    estado: string;
  
    @Column({ name: 'estado_sigla',length: 2 })
    estadoSigla: string;
  
    @Column({ length: 100 })
    pais: string;
}
  
export { Cidade };