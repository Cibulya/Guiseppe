import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { createStaticFolder } from './files/html.file';

async function Server() {
	try {
		await createStaticFolder();
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
		app.enableCors();
		app.use(cookieParser());
		await app.listen(process.env.PORT);
	} catch (e) {
		console.log(e);
	}
}
Server();
