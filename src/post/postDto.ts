import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class Post {
	@ApiProperty({
		example: 'Zhong Cena',
		description: 'Posts author name',
	})
	@Prop()
	authorName: string;
	@ApiProperty({
		example: 'Long time ago in galaxy far away,Jedi kights.....',
		description: 'Post text',
	})
	@Prop()
	postText: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export class PostDto {
	@ApiProperty({
		example: 'Zhong Cena',
		description: 'Posts author name',
	})
	@Prop()
	authorName: string;
	@ApiProperty({
		example: 'Long time ago in galaxy far away,Jedi kights.....',
		description: 'Post text',
	})
	@Prop()
	postText: string;
}
