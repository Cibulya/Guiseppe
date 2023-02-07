import { Module } from '@nestjs/common';
import { CoffesModule } from './coffes/coffes.module';
@Module({
  imports: [CoffesModule],
})
export class AppModule {}
