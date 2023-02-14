import { HttpStatus, Injectable } from '@nestjs/common';
import {
	HttpException,
	UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { UserDocument } from 'src/users/users.schema';
import { UserService } from 'src/users/users.service';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
		private readonly tokenService: TokenService
	) {}
	async login(user: UserDocument) {
		await this.validateUser(user);
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
		} else {
			const activationLink = uuid.v4();
			const secretPassword = await bcrypt.hash(user['password'], 5);
			user['password'] = secretPassword;
			user['coffestatus'] = 'none';
			user['activationLink'] = activationLink;
			user['isActivated'] = false;
			user['userPic'] = 'Default pic';

			await this.mailService.sendActivationMail(
				user['email'],
				`${process.env.SERVER}/activate/${activationLink}`
			);
			await this.userService.createUser(user);
			const { refreshToken, accessToken } = await this.generateToken(
				user
			);
			return { refreshToken, accessToken };
		}
	}
	private async generateToken(user: UserDocument) {
		const payload = {
			userName: user['userName'],
			password: user['password'],
		};

		const accessToken = this.jwtService.sign(payload, {
			privateKey: process.env.ACCESSTOKEN,
			expiresIn: '30m',
		});
		const refreshToken = this.jwtService.sign(payload, {
			privateKey: process.env.REFRESHTOKEN,
			expiresIn: '10d',
		});
		await this.tokenService.createToken(payload['userName'], refreshToken);
		return { refreshToken, accessToken };
	}
	private async validateUser(user: UserDocument) {
		const validUser = await this.userService.findOneUser({
			userName: user['userName'],
		});
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
