import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { CoffesModule } from './coffes/coffes.module';
import { UserModule } from './user/user.module';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		CoffesModule,
		UserModule,
	],
})
export class AppModule {}
