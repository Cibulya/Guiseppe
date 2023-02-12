import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { FilesService } from 'src/files/file.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { UserService } from './users.service';

@Module({
	imports: [
		forwardRef(() => AuthModule),
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		MongooseModule.forRoot(process.env.DB_URI, {
			dbName: 'Users',
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],

	controllers: [UsersController],
	providers: [FilesService, UserService],
	exports: [UserService, UsersModule],
})
export class UsersModule {}
