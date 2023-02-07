import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './coffes.schema';

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
