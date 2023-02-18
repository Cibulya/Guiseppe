import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { createStaticFolder } from './files/html.file';
import { stylesCopy } from './utils/appData';
import { defaultUserPics } from './utils/defaultUserPics';

async function Server() {
	try {
		await createStaticFolder();
		await defaultUserPics();
		await stylesCopy();
		const app = await NestFactory.create(AppModule, {
			rawBody: true,
			cors: true,
		});
		const config = new DocumentBuilder()
			.setTitle('Api documentation')
			.addTag('C:DEV super backend 3000')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api/docs', app, document);
		app.use(cookieParser());
		app.enableCors({
			credentials: true,
			methods: ['OPTIONS', 'POST', 'GET', 'PUT'],
			origin: 'http://127.0.0.1:5500/testhtml/',
			preflightContinue: true,
			allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
		});
		await app.listen(process.env.PORT);
	} catch (e) {
		console.log(e);
	}
}
Server();
