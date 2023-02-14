import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';

@Injectable()
export class TokenService {
	constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}
	async createToken(token: TokenDocument, refreshToken: string) {
		const tokenData = await this.tokenModel.findOneAndUpdate({
			user: token['user'],
		});
		if (tokenData) {
			tokenData['refreshToken'] = refreshToken;
			await tokenData.save();
		}
		const newToken = await this.tokenModel.create({
			user: token,
			refreshToken: refreshToken,
		});
		return newToken;
	}
}
