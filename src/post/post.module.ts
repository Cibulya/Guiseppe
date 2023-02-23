import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from './postDto';

@Module({
	imports: [
		MongooseModule.forRoot(process.env.DB_URI, {
			dbName: 'posts',
		}),
		MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
	],
	providers: [PostService],
	controllers: [PostController],
})
export class PostModule {}
