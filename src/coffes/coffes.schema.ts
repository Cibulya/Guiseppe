import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Document } from 'mongoose';
export type CoffeDocument = Document<Coffee>;
export type CoffeeSize = 'XS' | 'S' | 'M' | 'L';

@Schema()
export class Coffee {
	@ApiProperty({ example: 'Americano', description: 'Uniq name of beverage' })
	@Prop()
	name: string;
	@ApiProperty({ example: 'black', description: 'Color of beverage' })
	@Prop()
	recipe: string;
	@ApiProperty({
		example: 'http//localhost:4000/johncenavsealbums.jpg',
		description: 'Image of beverage',
	})
	@Prop()
	picture: string;
	@ApiProperty({
		example: 'M',
		description: 'Image of beverage',
	})
	@Prop()
	size: CoffeeSize | 'M';
	@ApiProperty({
		example: '1',
		description: 'Uniq number of beverage in collection',
	})
	@Prop()
	index: string;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
