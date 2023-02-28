import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { createStaticFolder } from './files/html.file';
import { defaultUserPics } from './utils/defaultUserPics';
import { htmlBuilderTrebute } from './utils/staticClientFiles';

async function Server() {
	try {
		await createStaticFolder();
		await defaultUserPics();
		await htmlBuilderTrebute();
		const app = await NestFactory.create(AppModule, {
			rawBody: true,
			cors: true,
		});
		const config = new DocumentBuilder()
			.setTitle('MVC Coffee Api')
			.addTag('Never gonna give you up!')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api/docs', app, document);
		app.use(cookieParser());
		app.enableCors({
			credentials: true,
			methods: ['OPTIONS', 'POST', 'GET', 'PUT', 'PATCH'],
			origin: '*',
			preflightContinue: true,
			allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
		});
		await app.listen(process.env.PORT);
	} catch (e) {
		console.log(e);
	}
}
Server();
