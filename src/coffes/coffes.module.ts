import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './coffes.schema';

const DB_URI =
  'mongodb+srv://cdev:wvf7eo4HaLfn7yHW@pr42.qojklfb.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URI, {
      dbName: 'coffes',
    }),
    MongooseModule.forFeature([{ name: Coffee.name, schema: CoffeeSchema }]),
  ],
  controllers: [CoffesController],
  providers: [CoffesService],
  exports: [],
})
export class CoffesModule {}
