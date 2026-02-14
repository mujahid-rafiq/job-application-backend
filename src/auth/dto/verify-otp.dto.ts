import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 6, { message: 'OTP must be 6 digits' })
    otp: string;
}
