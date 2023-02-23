import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDto } from './postDto';
@Injectable()
export class PostService {
	constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
	async createPost(dto: PostDto) {
		const newpost = await this.postModel.create(dto);
		newpost.save();
		return newpost;
	}

	async getAllPosts() {
		const allposts = await this.postModel.find().exec();
		return allposts;
	}
}
