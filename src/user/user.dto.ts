import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { generateUserImageLink } from 'src/utils/generateRandomUserPick';
import * as uuid from 'uuid';

export class UserPictureDto {
	@ApiProperty({
		example: 'w@w.uwu',
		description: 'User`s email',
	})
	@Prop({ unique: true })
	email: string;
	@ApiProperty({
		example: 'http//ultrabackend:4000/johncenavsealbums.jpg',
		description: 'User picture',
	})
	userImage: string;
}

export class UserQuizDto {
	@ApiProperty({
		example: 'w@w.uwu',
		description: 'User`s email',
	})
	@Prop({ unique: true, immutable: true })
	email: string;
	@ApiProperty({
		example: '10',
		description: 'User picture',
	})
	quizStatus: string;
}

export class UserRestorePassDto {
	@ApiProperty({
		example: 'w@w.uwu',
		description: 'User`s email',
	})
	@Prop({ unique: true })
	email: string;
	// @ApiProperty({
	// 	example: 'Zh0n9_C3na',
	// 	description: 'User password',
	// })
	// password: string;
	@ApiProperty({
		example: 'someword',
		description: 'User`s secret word',
	})
	@Prop({ default: 'none' })
	secretWord: string;
	@ApiProperty({
		example: 'Zh0n9_C3na',
		description: 'User`s secret word',
	})
	@Prop({ default: 'none' })
	newPassword: string;
}

export class UserCreateDto {
	@ApiProperty({
		example: 'Zhong Cena',
		description: 'Username',
	})
	@Prop()
	name: string;
	@ApiProperty({
		example: 'w@w.uwu',
		description: 'User`s email',
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
		description: 'Last coffee prepared',
	})
	@Prop({ default: '0' })
	coffeeStatus: string;

	@ApiProperty({
		example: '0',
		description: 'Quiz status',
	})
	@Prop({ default: '0' })
	quizStatus: string;
}

export class UserCoffeeDto {
	@ApiProperty({
		example: 'w@w.uwu',
		description: 'User`s email',
	})
	@Prop({ unique: true, immutable: true })
	email: string;
	@ApiProperty({
		example: 'Espresso',
		description: 'Last coffee choosen',
	})
	coffeeStatus: string;
}
