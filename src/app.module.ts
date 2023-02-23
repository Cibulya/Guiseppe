import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { CoffesModule } from './coffes/coffes.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		CoffesModule,
		UserModule,
		PostModule,
	],
})
export class AppModule {}
