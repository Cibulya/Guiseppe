import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document<User>;

@Schema()
export class User {
	@Prop({ required: true, default: 'User' })
	userName: string;
	@Prop({ required: true })
	password: string;
	@Prop()
	email: string;
	@Prop()
	userPic: string;
	@Prop()
	coffeeStatus: string;
	@Prop()
	isActivated: boolean;
	@Prop({ unique: true })
	activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
