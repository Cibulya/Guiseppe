import {
	Controller,
	Get,
	HttpStatus,
	Patch,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';

import { HttpException } from '@nestjs/common/exceptions';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UserService } from './user.service';
@Controller('api')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register')
	async registration(@Req() request: Request) {
		try {
			return await this.userService.createUser(request.body);
		} catch (e) {
			if (e) {
				throw new HttpException(
					'User allready exists',
					HttpStatus.BAD_REQUEST
				);
			}
		}
	}
	@Post('login')
	async login(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	) {
		const { jwtToken } = await this.userService.login(request.body);
		response.cookie('jwt', jwtToken, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		const validated = await this.userService.validateUser(request);
		response.json(validated);
	}
	@Get('user')
	async user(@Req() request: Request) {
		try {
			return await this.userService.validateUser(request);
		} catch (e) {
			throw new UnauthorizedException('Invalid credetials');
		}
	}
	@Post('logout')
	async logout(@Res({ passthrough: true }) response: Response) {
		response.cookie('jwt', '', {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		return {
			message: 'Goodbye',
		};
	}
	@Get('activate/:activationLink')
	async activateUser(@Req() req: Request) {
		try {
			await this.userService.activate(req);
			throw new HttpException('Account activated', HttpStatus.ACCEPTED);
		} catch (e) {
			throw new HttpException(
				'Invalid activation link',
				HttpStatus.BAD_REQUEST
			);
		}
	}
	@Patch('setpicture')
	@UseInterceptors(AnyFilesInterceptor())
	async uploadFile(
		@UploadedFiles() file: Express.Multer.File,
		@Req() req: Request
	) {
		// console.log(file);
		await this.userService.setUserPic(file[0], req.body);
		throw new HttpException('Picture uploaded', HttpStatus.ACCEPTED);
	}
}