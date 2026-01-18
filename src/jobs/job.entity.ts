import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({message:"Full Name is Required"})
  @IsString()
  fullName: string;
   
  @IsNotEmpty({message:'Email is Required'})
  @IsString()
  email: string;

  @IsNotEmpty({message:'Phone is Required'})
  @IsString()
  phone: string;

  @IsNotEmpty({message:'Position is Not Empty'})
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  coverLetter: string;

  @CreateDateColumn()
  createdAt: Date;
}
