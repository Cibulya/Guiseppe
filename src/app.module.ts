import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { CoffesModule } from './coffes/coffes.module';
import { MailModule } from './mail/mail.module';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		CoffesModule,
		AuthModule,
	],
})
export class AppModule {}
