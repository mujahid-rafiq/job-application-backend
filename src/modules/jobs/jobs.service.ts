import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
    constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) { }

    async create(createJobDto: CreateJobDto) {
        return this.jobModel.create(createJobDto);
    }

    async findAll(category?: string, search?: string) {
        const query: any = { isActive: true };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
            ];
        }

        return this.jobModel.find(query).exec();
    }

    async findById(id: string) {
        const job = await this.jobModel.findById(id).exec();
        if (!job) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
    }

    async update(id: string, updateJobDto: UpdateJobDto) {
        const updatedJob = await this.jobModel
            .findByIdAndUpdate(id, updateJobDto, { new: true })
            .exec();
        if (!updatedJob) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
        return updatedJob;
    }

    async delete(id: string) {
        const result = await this.jobModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
        return { message: 'Job deleted successfully' };
    }
}
