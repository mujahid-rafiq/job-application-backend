import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    category: string;

    @Prop()
    location: string;

    @Prop()
    salary: string; 

    @Prop()
    jobType: string;

    @Prop({ default: false })
    isNew: boolean;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    description: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
