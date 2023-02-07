import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document<Required<User>>;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  emeil: string;
  @Prop()
  password: string;
  @Prop()
  isActivated: string;
  @Prop()
  activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
