import {
	Controller,
	Get,
	Post,
	Req,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { Patch, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FilesService } from 'src/files/file.service';
import { UserService } from './users.service';

@Controller()
export class UsersController {
	constructor(
		private readonly userService: UserService,
		private readonly filesService: FilesService
	) {}

	@Get('user')
	async findUser(@Req() req: Request) {
		return await this.userService.findOneUser(req.body);
	}
	// @UseGuards(JwtAuthGuard)
	@Post()
	async createUser(@Req() req: Request) {
		return await this.userService.createUser(req.body);
	}
	@Patch('user')
	@UseInterceptors(AnyFilesInterceptor())
	async uploadFile(
		@UploadedFiles() file: Express.Multer.File,
		@Req() req: Request
	) {
		await this.filesService.createFile(file[0], req.body);
		throw new HttpException('Picture uploaded', HttpStatus.ACCEPTED);
	}
	@Patch('user/:userName')
	async patchUserStats(@Req() req: Request) {
		return this.userService.patchStatistics(req.params, req.body);
	}
	@Get('activate/:activationLink')
	async activateUser(@Req() req: Request, @Res() res: Response) {
		await this.userService.activate(req);
		res.redirect('http://localhost:5000/static');
	}
}
