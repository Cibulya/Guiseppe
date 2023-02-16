import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
@Controller('api')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly jwtServise: JwtService
	) {}

	@Post('register')
	async registration(
		@Body('name') name: string,
		@Body('email') email: string,
		@Body('password') password: string
	) {
		try {
			const superPass = await bcrypt.hash(password, 5);
			const user = {
				name,
				email,
				password: superPass,
			};
			const newUser = await this.userService.createUser(user);
			return newUser;
		} catch (e) {
			if (e) {
				console.log(e);
			}
		}
	}
	@Post('login')
	async login(
		@Body('email') email: string,
		@Body('password') password: string,
		@Res({ passthrough: true }) response: Response
	) {
		const user: UserDto = {
			email,
		};
		const finded = await this.userService.findUserByEmail(user);
		if (!(await bcrypt.compare(password, finded.password))) {
			throw new UnauthorizedException('Invalid credentials');
		}
		const jwtToken = await this.jwtServise.signAsync({
			email,
		});
		response.cookie('jwt', jwtToken, { httpOnly: true });

		await delete finded.password;

		return finded;
	}
	@Get('user')
	async user(@Req() request: Request) {
		try {
			const cookie = request.cookies['jwt'];
			const data = await this.jwtServise.verifyAsync(cookie);
			if (!data) {
				throw new UnauthorizedException('Invalid credetials');
			}
			const user = await this.userService.findUserByEmail({
				id: data['id'],
			});
			const {
				name,
				email,
				isActivated,
				activationLink,
				coffeeStatus,
				userImage,
			} = user;
			const DataToServe = {
				name,
				email,
				isActivated,
				activationLink,
				userImage,
				coffeeStatus,
			};
			return DataToServe;
		} catch (e) {
			throw new UnauthorizedException('Invalid credetials');
		}
	}
	@Post('logout')
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie('jwt');
		return {
			message: 'succcess',
		};
	}
}
