import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'src/users/users.schema';
import { AuthService } from './auth.service';
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('/login')
	async login(@Body() SchemaType: UserDocument) {
		return this.authService.login(SchemaType);
	}

	@Post('/registration')
	async registration(
		@Body() SchemaType: UserDocument,
		@Res({ passthrough: true }) response
	) {
		const { refreshToken } = await this.authService.registration(
			SchemaType
		);
		response.cookie('refreshToken', refreshToken, { httpOnly: true });
		throw new HttpException(
			'User successfully created',
			HttpStatus.ACCEPTED
		);
	}
	// @Post('/logout')
	// async logout(@Body() SchemaType: UserDocument) {
	// 	// return this.authService.registration(SchemaType);
	// }
}
