import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) { }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(dto: RegisterDto) {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const otp = this.generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = new this.userModel({
      ...dto,
      password: hashedPassword,
      verificationOTP: otp,
      otpExpiry: otpExpiry,
      isVerified: false,
    });
    await user.save();

    // Send OTP email with beautiful template
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Verify Your Email - Job Application Portal',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
              .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
              .content { padding: 40px 30px; }
              .otp-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 5px; }
              .otp-code { font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; text-align: center; margin: 20px 0; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
              .button { display: inline-block; padding: 12px 30px; background: #667eea; color: #ffffff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔐 Email Verification</h1>
              </div>
              <div class="content">
                <h2>Hello ${user.firstName || 'User'}!</h2>
                <p>Thank you for registering with <strong>Job Application Portal</strong>.</p>
                <p>Please use the following OTP to verify your email address:</p>
                <div class="otp-box">
                  <div class="otp-code">${otp}</div>
                </div>
                <p><strong>⏰ This OTP will expire in 10 minutes.</strong></p>
                <p>If you didn't request this, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>© 2026 Job Application Portal. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (error) {
      console.error('Failed to send OTP email:', error);
    }

    return {
      message: 'Registration successful! Please check your email for OTP verification.',
      email: user.email
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (!user.verificationOTP || !user.otpExpiry) {
      throw new BadRequestException('No OTP found. Please register again.');
    }

    if (new Date() > user.otpExpiry) {
      throw new BadRequestException('OTP has expired. Please request a new one.');
    }

    if (user.verificationOTP !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    user.isVerified = true;
    user.verificationOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return { message: 'Email verified successfully! You can now login.' };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email before logging in');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isVerified: user.isVerified
      }
    };
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }
}

