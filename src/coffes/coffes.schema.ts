import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Document } from 'mongoose';
export type CoffeDocument = Document<Coffee>;
export type CoffeeSize = 'XS' | 'S' | 'M' | 'L';

@Schema()
export class Coffee {
	@ApiProperty({ example: 'Espresso', description: 'Uniq name of beverage' })
	@Prop()
	name: string;
	@ApiProperty({ example: '#291612', description: 'Color of beverage' })
	@Prop()
	recipe: string;
	@ApiProperty({
		example:
			'https://raw.githubusercontent.com/MarinaKovel/coffeemachinedata/main/coffee-types/espresso.png',
		description: 'Image of beverage',
	})
	@Prop()
	picture: string;
	@ApiProperty({
		example: 'S',
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
