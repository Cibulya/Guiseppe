import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function Server() {
  try {
    const app = await NestFactory.create(AppModule, { rawBody: true });
    await app.listen(process.env.PORT);
  } catch (e) {
    console.log(e);
  }
}
Server();
