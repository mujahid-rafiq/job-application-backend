import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MongoDB connection
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/job_application',
    ),

    AuthModule,
    JobsModule,
    MailModule
  ],
  providers: [ChatGateway],
})
export class AppModule { }

