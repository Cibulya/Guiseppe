import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document<User>;

@Schema()
export class User {
	@Prop()
	userName: string;
	@Prop()
	password: string;
	@Prop()
	email: string;
	@Prop()
	userPic: string;
	@Prop()
	coffeeStatus: string;
	@Prop()
	isActivated: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
