import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from 'src/files/file.service';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
@Module({
	imports: [
		JwtModule.register({
			secret: process.env.REFRESHTOKEN,
			signOptions: {
				expiresIn: '1d',
			},
		}),
		MongooseModule.forRoot(process.env.DB_URI, {
			dbName: 'users',
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		MailModule,
	],

	providers: [UserService, MailService, FilesService],

	controllers: [UserController],
})
export class UserModule {}
