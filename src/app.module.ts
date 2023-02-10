import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { CoffesModule } from './coffes/coffes.module';
import { UsersModule } from './users/users.module';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		CoffesModule,
		UsersModule,
	],
})
export class AppModule {}
