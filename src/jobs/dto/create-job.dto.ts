import { IsNotEmpty, IsOptional, } from 'class-validator';

export class CreateJobDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    company: string;

    @IsNotEmpty()
    category: string;

    @IsOptional()
    location?: string;
  
    @IsOptional()
    salary?: string;

    @IsOptional()
    jobType?: string;

    @IsOptional()
    isNew?: boolean;

    @IsOptional()
    isActive?: boolean;

    @IsOptional()
    description?: string;
}
