import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({
			privateKey: process.env.SECRET,
			signOptions: {
				expiresIn: '24h',
			},
		}),
		TokenModule,
	],
	controllers: [AuthController],
	providers: [AuthService, MailService],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
