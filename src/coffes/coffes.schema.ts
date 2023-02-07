import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoffeDocument = Document<Coffee>;
export type CoffeeSize = 'XS' | 'S' | 'M' | 'L';

@Schema()
export class Coffee {
  @Prop()
  name: string;
  @Prop()
  recipe: string;
  @Prop()
  picture: string;
  @Prop()
  size: CoffeeSize | 'm';
  @Prop()
  index: string;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
