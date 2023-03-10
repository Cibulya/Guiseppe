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
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
	PickType,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { FilesService } from 'src/files/file.service';
import {
	UserCoffeeDto,
	UserCreateDto,
	UserNewDto,
	UserPictureDto,
	UserQuizDto,
	UserRestorePassDto,
} from './user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@ApiTags('All operations with users')
@Controller('api')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly fileservice: FilesService
	) {}
	@ApiOperation({ summary: 'Create User' })
	@ApiResponse({
		status: 200,
		description: 'User created',
	})
	@ApiBody({
		type: UserNewDto,
		description: 'User',
	})
	@Post('register')
	async registration(@Req() request: Request): Promise<{ message: string }> {
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

	@ApiOperation({ summary: 'Get user object' })
	@ApiResponse({
		status: 200,
		description: 'User',
		type: UserCreateDto,
	})
	@ApiBody({
		type: PickType(User, ['email', 'password']),
	})
	@Post('login')
	async login(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	): Promise<void> {
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

	@ApiOperation({ summary: 'Get logged user object' })
	@ApiResponse({
		status: 200,
		description: 'Object',
		type: UserCreateDto,
	})
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
	@ApiOperation({ summary: 'Logout' })
	@ApiResponse({
		status: 200,
		description: 'Goodbye',
	})
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
	@ApiOperation({
		summary: 'Activate user accunt',
		description: 'Mail activation',
	})
	@ApiResponse({
		status: 200,
		description: 'Account activated',
	})
	@ApiParam({
		example: 'e4e35de5-4747-4412-8c47-a20ad3ef9ecd',
		description: '1',
		name: 'activationLink',
	})
	@Get('activate/:activationLink')
	async activateUser(@Req() req: Request, @Res() res: Response) {
		try {
			await this.userService.activate(req);
			res.status(200).redirect(`${process.env.DEPLOYED_SERVER}activate`);
		} catch (e) {
			if (e) {
				throw new HttpException(
					'Invalid activation link',
					HttpStatus.BAD_REQUEST
				);
			}
		}
	}

	@ApiOperation({
		summary: 'Update users photo',
		description: 'New foto',
	})
	@ApiResponse({
		status: 200,
		description: 'Picture updated',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@ApiBody({
		type: UserPictureDto,
	})
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
				throw new HttpException(
					'We dont need you files anymore',
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			}
		}
	}
	@ApiOperation({
		summary: 'Restore password',
		description: 'Set new password with secret word',
	})
	@ApiResponse({
		status: 200,
		description: 'New password send via email',
	})
	@ApiResponse({
		status: 403,
		description: 'Iternal Server Error',
	})
	@ApiBody({
		type: UserRestorePassDto,
	})
	@Post('restore')
	async restorePassword(@Req() req: Request, @Res() res: Response) {
		try {
			await this.userService.restorePassword(req);
			res.status(200).json({ message: 'Please check your email' });
		} catch (e) {
			throw new HttpException(
				'Stop forget your passwords',
				HttpStatus.FORBIDDEN
			);
		}
	}
	@ApiOperation({
		summary: 'Update Quiz Status',
		description: 'Counting answers',
	})
	@ApiResponse({
		status: 200,
		description: 'You are God damn right,Jessey!',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@ApiBody({
		type: UserQuizDto,
	})
	@Put('quiz')
	async updateQuizStatus(@Req() req: Request, @Res() res: Response) {
		const { quizStatus } = await this.userService.updateQuiz(req.body);
		res.status(200).json({ quizStatus: quizStatus });
	}
	@ApiOperation({
		summary: 'Update last choosen coffee',
		description: 'And another one!',
	})
	@ApiResponse({
		status: 201,
		description: 'Mmmm,nice!',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@ApiBody({
		type: UserCoffeeDto,
	})
	@Put('coffeestat')
	async coffeeStatusUpdate(@Req() req: Request, @Res() res: Response) {
		const { message } = await this.userService.coffeeStatusUpdate(req.body);
		res.status(200).json(message);
	}
}
