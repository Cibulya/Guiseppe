import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}
	async createUser(user: UserDocument) {
		const checkUser = await this.userModel.findOne({
			userName: user['userName'],
		});
		if (checkUser) {
			throw new HttpException(
				'User allready exist',
				HttpStatus.BAD_REQUEST
			);
		} else {
			const createdUser = await this.userModel.create(user);
			createdUser.save();
			throw new HttpException('User Created', HttpStatus.ACCEPTED);
		}
	}
	async findOneUser(params: { userName: any }) {
		return await this.userModel.findOne({ userName: params.userName });
	}
	async patchStatistics(params: FilterQuery<User>, body: UpdateQuery<User>) {
		const upDatedUser = await this.userModel.findOneAndUpdate(params, body);
		console.log(upDatedUser);
	}
}
