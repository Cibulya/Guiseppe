import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
	HttpException,
	UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/users.schema';
import { UserService } from 'src/users/users.service';
@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}
	async login(user: UserDocument) {
		const user1 = await this.validateUser(user);
		return await this.generateToken(user);
	}

	async registration(user: UserDocument) {
		const candidate = await this.userService.findOneUser({
			userName: user['userName'],
		});
		if (candidate) {
			throw new HttpException(
				'User allready exist',
				HttpStatus.BAD_REQUEST
			);
		}
		const secretPassword = await bcrypt.hash(user['password'], 5);
		user['password'] = secretPassword;
		user['coffestatus'] = '12';

		await this.userService.createUser(user);
		return await this.generateToken(user);
	}
	private async generateToken(user: UserDocument) {
		const payload = {
			userName: user['userName'],
			password: user['password'],
			coffeeStatus: user['coffeeStatus'],
		};
		return {
			token: this.jwtService.sign(payload),
		};
	}
	private async validateUser(user: UserDocument) {
		const validUser = await this.userService.findOneUser({
			userName: user['userName'],
		});
		console.log(validUser);
		const passWordChek = await bcrypt.compare(
			user['password'],
			validUser['password']
		);
		if (user && passWordChek) {
			return validUser;
		} else {
			throw new UnauthorizedException({ Message: 'Invalid password' });
		}
	}
}
