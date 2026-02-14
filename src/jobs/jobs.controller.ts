import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobsService.create(createJobDto);
    }

    @Get()
    findAll(@Query('category') category?: string, @Query('search') search?: string) {
        return this.jobsService.findAll(category, search);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobsService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
        return this.jobsService.update(id, updateJobDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobsService.delete(id);
    }
}

