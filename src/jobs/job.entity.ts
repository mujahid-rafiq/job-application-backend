import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

   
  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  experience: string;

  @Column({ type: 'text', nullable: true })
  coverLetter: string;

  @CreateDateColumn()
  createdAt: Date;
}
