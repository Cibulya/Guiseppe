import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type TokenDocument = Document<Required<Token>>;

@Schema()
export class Token {
  @Prop()
  user: string;
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
