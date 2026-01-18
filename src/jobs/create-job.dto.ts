import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  fullName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  phone: string;

  @IsNotEmpty({ message: 'Position is required' })
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;

//   @IsOptional()
//   @IsString()
//   resumePath?: string; 
}
