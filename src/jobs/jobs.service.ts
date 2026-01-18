import { Injectable } from '@nestjs/common';
import { Job } from './job.entity';
import { CreateJobDto } from './create-job.dto';

@Injectable()
export class JobsService {
  private jobs: Job[] = [];
  private idCounter = 1;

  create(payload: CreateJobDto) {
    const job: Job = {
      id: this.idCounter++,
      ...payload,
      createdAt: new Date(),
    } as Job;
    this.jobs.push(job);
    return job;
  }

  getAll() {
    return this.jobs;
  }

  getById(id: number) {
    return this.jobs.find((job) => job.id === id);
  }


}
