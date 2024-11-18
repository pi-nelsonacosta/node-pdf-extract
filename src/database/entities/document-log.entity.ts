import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('document_logs') // Nombre de la tabla en la base de datos
export class DocumentLog {
  @PrimaryGeneratedColumn()
  id: number; // ID único para cada registro

  @Column()
  filename: string; // Nombre del archivo procesado

  @Column()
  status: string; // Estado del procesamiento (por ejemplo, "Done")

  @CreateDateColumn()
  createdAt: Date; // Fecha de creación del registro
}
