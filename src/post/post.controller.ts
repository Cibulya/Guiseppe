import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PostService } from './post.service';
import { PostDto } from './postDto';
@ApiTags('All operations with posts')
@ApiTags('smack my bitch up')
@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}
	@ApiOperation({ summary: 'Create post' })
	@ApiResponse({
		status: 200,
		description: 'Post created',
	})
	@ApiBody({
		type: PostDto,
		description: 'New post',
	})
	@Post('newpost')
	async newPost(@Req() request: Request) {
		try {
			return await this.postService.createPost(request.body);
		} catch (e) {
			if (e) {
				throw new HttpException(
					'Something went wrong! ups...',
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			}
		}
	}
	@ApiOperation({ summary: 'Get all posts from server.' })
	@ApiResponse({
		status: 200,
		description: 'Get all posts',
		type: [PostDto],
	})
	@Get('all')
	async getAllPosts() {
		try {
			return await this.postService.getAllPosts();
		} catch (e) {
			if (e) {
				throw new HttpException(
					'Something went wrong! ups...',
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			}
		}
	}
}
