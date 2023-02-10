import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function Server() {
	try {
		const app = await NestFactory.create(AppModule, {
			rawBody: true,
			cors: true,
		});
		app.enableCors();
		await app.listen(process.env.PORT);
	} catch (e) {
		console.log(e);
	}
}
Server();
