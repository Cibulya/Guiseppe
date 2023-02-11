import {
	Controller,
	Get,
	Post,
	Req,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
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
	@Post('user')
	async createUser(@Req() req: Request) {
		return await this.userService.createUser(req.body);
	}
	@Patch('user')
	@UseInterceptors(AnyFilesInterceptor())
	async uploadFile(
		@UploadedFiles() file: Express.Multer.File,
		@Req() req: Request
	) {
		console.log(file[0]);
		await this.filesService.createFile(file[0], req.body);
		throw new HttpException('Picture uploaded', HttpStatus.ACCEPTED);
	}
	@Get('static')
	async getPic() {
		return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Miska ris</title>
</head>
<body>
sas
  <img src="http://guiseppe-production.up.railway.app:5000/92e1bfdc-f319-445b-88b9-3c2a7319169d.jpg">
</body>
</html>`;
	}
	@Patch('user/:userName')
	async patchUserStats(@Req() req: Request) {
		return this.userService.patchStatistics(req.params, req.body);
	}
}
