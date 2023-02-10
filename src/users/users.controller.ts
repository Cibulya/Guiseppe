import {
	Controller,
	Get,
	Post,
	Req,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
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
	@Post()
	async createUser(@Req() req: Request) {
		return await this.userService.createUser(req.body);
	}
	@Post('file')
	@UseInterceptors(AnyFilesInterceptor())
	async uploadFile(@UploadedFiles() file: Express.Multer.File) {
		return await this.filesService.createFile(file[0]);
	}
	@Get('static')
	async getPic() {
		return `<img src="/static/212afd72-8ce2-4ffa-9249-2d29fab076d3.jpg">`;
	}
}
