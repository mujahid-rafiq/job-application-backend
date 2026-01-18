import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
