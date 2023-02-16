import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async createUser(user: Partial<User>) {
		const candidateUser = await this.userModel.findOne({
			email: user.email,
		});
		if (candidateUser) {
			throw new HttpException(
				'User allready exists',
				HttpStatus.BAD_REQUEST
			);
		} else {
			const newUser = await this.userModel.create(user);
			newUser.save();
			return newUser;
		}
	}
	async findUserByEmail(condition: any) {
		const finded = await this.userModel.findOne({ condition });
		if (!finded) {
			throw new UnauthorizedException('Invalid credentials');
		} else {
			return finded;
		}
	}
}
