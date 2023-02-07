import { NestFactory } from '@nestjs/core';
import { CoffesModule } from './coffes/coffes.module';
import { AppModule } from './app.module';

async function Server() {
  try {
    const app = await NestFactory.create(AppModule, { rawBody: true });
    await app.listen(3000);
  } catch (e) {
    console.log(e);
  }
}
Server();
