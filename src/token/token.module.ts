import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.schema';
import { TokenService } from './token.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		MongooseModule.forRoot(process.env.DB_URI, {
			dbName: 'Tokens',
		}),
		MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
	],
	providers: [TokenService],
	exports: [TokenService],
})
export class TokenModule {}
