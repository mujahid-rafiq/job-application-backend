import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty({ example: 'user@example.com', description: 'Registered email' })
    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456', description: '6-digit OTP from email' })
    @IsString()
    @IsNotEmpty()
    @Length(6, 6, { message: 'OTP must be 6 digits' })
    otp: string;
}
