import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
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
	],

	providers: [UserService],

	controllers: [UserController],
})
export class UserModule {}
