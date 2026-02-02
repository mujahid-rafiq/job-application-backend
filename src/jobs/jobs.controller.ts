import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { CreateJobDto } from './create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post('apply')
  async create(@Body() createDto: CreateJobDto): Promise<Job> {
    return await this.jobsService.create(createDto);
  }

  @Get()
  async getAll(): Promise<Job[]> {
    return await this.jobsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Job | null> {
    return await this.jobsService.getById(Number(id));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.jobsService.delete(Number(id));
  }
}
