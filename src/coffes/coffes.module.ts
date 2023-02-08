import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffesController } from './coffes.controller';
import { Coffee, CoffeeSchema } from './coffes.schema';
import { CoffesService } from './coffes.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      dbName: 'coffees',
    }),
    MongooseModule.forFeature([{ name: Coffee.name, schema: CoffeeSchema }]),
  ],
  controllers: [CoffesController],
  providers: [CoffesService],
  exports: [],
})
export class CoffesModule {}
