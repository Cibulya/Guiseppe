import { NestFactory } from '@nestjs/core';
import { CoffesModule } from './coffes/coffes.module';

async function bootstrap() {
  const app = await NestFactory.create(CoffesModule, { rawBody: true });
  await app.listen(3000);
}
bootstrap();
//dssadas
