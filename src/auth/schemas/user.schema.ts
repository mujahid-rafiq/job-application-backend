import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/users/enums/role.enums';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;



    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ required: false })
    verificationOTP?: string;

    @Prop({ required: false })
    otpExpiry?: Date;
    @Prop({
        type: String,
        enum: Role,
        default: Role.USER
    })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
