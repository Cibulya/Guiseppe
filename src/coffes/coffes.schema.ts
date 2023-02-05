import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type CoffeDocument = Document<Coffee>;

@Schema()
export class Coffee {
  @Prop()
  name: string;
  @Prop()
  recipe: string;
  @Prop()
  picture: string;
  @Prop()
  index: string;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
