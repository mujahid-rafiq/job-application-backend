import { IsNotEmpty, IsOptional, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {

    @ApiProperty({ example: 'Senior NestJS Developer' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Tech Solutions Inc.' })
    @IsNotEmpty()
    company: string;

    @ApiProperty({ example: 'Software Development' })
    @IsNotEmpty()
    category: string;

    @ApiProperty({ example: 'Remote', required: false })
    @IsOptional()
    location?: string;

    @ApiProperty({ example: '$120k - $150k', required: false })
    @IsOptional()
    salary?: string;

    @ApiProperty({ example: 'Full-time', required: false })
    @IsOptional()
    jobType?: string;

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    isNew?: boolean;

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ example: 'Detailed job description goes here...', required: false })
    @IsOptional()
    description?: string;
}
