import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'src/users/users.schema';
import { AuthService } from './auth.service';
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('/login')
	login(@Body() SchemaType: UserDocument) {
		return this.authService.login(SchemaType);
	}

	@Post('/registration')
	registration(@Body() SchemaType: UserDocument) {
		return this.authService.registration(SchemaType);
	}
}
