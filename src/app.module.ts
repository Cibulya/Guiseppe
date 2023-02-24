import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { CoffesModule } from './coffes/coffes.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static', 'client'),
		}),
		CoffesModule,
		UserModule,
		PostModule,
	],
})
export class AppModule {}
