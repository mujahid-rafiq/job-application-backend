import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { CreateJobDto } from './create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post('apply')
  create(@Body() createDto:CreateJobDto) {
    return this.jobsService.create(createDto);
  }

  @Get()
  getAll() {
    return this.jobsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.jobsService.getById(Number(id));
  }
}
