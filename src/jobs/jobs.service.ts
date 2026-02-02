import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(payload: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(payload);
    return await this.jobRepository.save(job);
  }

  async getAll(): Promise<Job[]> {
    return await this.jobRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getById(id: number): Promise<Job | null> {
    return await this.jobRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
