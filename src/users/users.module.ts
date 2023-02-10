import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from 'src/files/file.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { UserService } from './users.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		MongooseModule.forRoot(process.env.DB_URI, {
			dbName: 'Users',
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UsersController],
	providers: [UserService, FilesService],
})
export class UsersModule {}
