import {
	Controller,
	Get,
	HttpStatus,
	Post,
	Put,
	Req,
	Res,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';

import { HttpException } from '@nestjs/common/exceptions';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FilesService } from 'src/files/file.service';
import { UserService } from './user.service';
@Controller('api')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly fileservice: FilesService
	) {}

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
		const { jwtToken, userDto } = await this.userService.login(
			request.body
		);
		response.cookie('jwt', jwtToken, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		response.status(200).json(userDto);
	}
	@Get('user')
	async user(@Req() request: Request) {
		try {
			return await this.userService.validateUser(request);
		} catch (e) {
			throw new HttpException(
				'Intrnal server error',
				HttpStatus.BAD_REQUEST
			);
		}
	}
	@Post('logout')
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		return {
			message: 'Goodbye',
		};
	}
	@Get('activate/:activationLink')
	async activateUser(@Req() req: Request, @Res() res: Response) {
		try {
			await this.userService.activate(req);
			res.status(201).json({ Message: 'Account activated' });
		} catch (e) {
			if (e) {
				console.log(req.file);
				throw new HttpException(
					'Invalid activation link',
					HttpStatus.BAD_REQUEST
				);
			}
		}
	}
	@Put('setpicture')
	@UseInterceptors(AnyFilesInterceptor())
	async uploadFile(
		@UploadedFiles() file: Express.Multer.File,
		@Req() req: Request,
		@Res() response: Response
	) {
		try {
			const lol = await this.fileservice.createFile(file[0], req.body);
			response.json(lol);
		} catch (e) {
			if (e) {
				console.log(e);
			}
		}
	}
	@Get('restore')
	async restorePassword(@Req() req: Request) {
		await this.userService.restorePassword(req);
	}
}
