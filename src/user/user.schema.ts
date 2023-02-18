import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Document } from 'mongoose';
import { generateUserImageLink } from 'src/utils/generateRandomUserPick';
import * as uuid from 'uuid';

export type UserDocument = Document<User>;

@Schema()
export class User {
	@ApiProperty({
		example: 'Zhong Cena',
		description: 'Username',
	})
	@Prop()
	name: string;

	@ApiProperty({
		example: 'Zh0n9_C3na',
		description: 'User password',
	})
	@Prop()
	password: string;
	@ApiProperty({
		example: 'bingjijgng@chmail.com',
		description: 'User email',
	})
	@ApiProperty({
		example: 'Zh0n9_C3na',
		description: 'User password',
	})
	@Prop({ default: 'none' })
	secretWord: string;
	@ApiProperty({
		example: 'someword',
		description: 'User`s secret word',
	})
	@Prop({ unique: true })
	email: string;
	@ApiProperty({
		example: 'http//ultrabackend:4000/johncenavsealbums.jpg',
		description: 'User picture',
	})
	@Prop({
		default: () => {
			return generateUserImageLink();
		},
	})
	userImage: string;
	@ApiProperty({
		example: '31231231231334',
		description: 'Account activation link',
	})
	@Prop({
		default: () => {
			return uuid.v4();
		},
	})
	activationLink: string;
	@ApiProperty({
		example: false,
		description: 'Activation status',
	})
	@Prop({ default: false })
	isActivated: boolean;
	@ApiProperty({
		example: '0',
		description: 'Learning status status',
	})
	@Prop({ immutable: true, default: '0' })
	coffeeStatus: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
