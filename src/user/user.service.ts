import {
	HttpException,
	HttpStatus,
	Injectable,
	Req,
	UnauthorizedException,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Model } from 'mongoose';
import { FilesService } from 'src/files/file.service';
import { MailService } from 'src/mail/mail.service';
import { User } from './user.schema';
@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private readonly mailServive: MailService,
		private readonly jwtServise: JwtService,
		private readonly fileService: FilesService
	) {}

	async createUser(user: Partial<User>) {
		const candidateUser = await this.userModel.findOne({
			email: user.email,
		});
		if (candidateUser) {
			throw new HttpException(
				'User allready exists',
				HttpStatus.BAD_REQUEST
			);
		} else {
			const superPass = await bcrypt.hash(user.password, 5);
			user.password = superPass;
			const newUser = await this.userModel.create(user);
			newUser.save();
			const finded = await this.userModel.findOne({
				email: newUser.email,
			});
			this.mailServive.sendActivationMail(
				user.email,
				`${process.env.SERVER}api/activate/${finded.activationLink}`
			);
			return { message: 'User created' };
		}
	}
	async login(user: Partial<User>) {
		try {
			const finded = await this.findUser(user.email);
			if (!(await bcrypt.compare(user.password, finded.password))) {
				throw new UnauthorizedException('Invalid credentials');
			} else {
				const { email } = finded;
				const jwtToken = await this.jwtServise.signAsync({ email });
				return { jwtToken };
			}
		} catch (e) {
			throw new UnauthorizedException('Invalid credentials');
		}
	}
	async findUser(condition: any) {
		const finded = await this.userModel.findOne({ condition });
		if (!finded) {
			throw new UnauthorizedException('Invalid credentials');
		} else {
			return finded;
		}
	}
	async validateUser(@Req() request: Request) {
		const cookie = request.cookies['jwt'];
		const data = await this.jwtServise.verifyAsync(cookie);
		if (!data) {
			throw new UnauthorizedException('Invalid credetials');
		} else {
			const {
				name,
				email,
				isActivated,
				activationLink,
				coffeeStatus,
				userImage,
			} = await this.findUser(request.body.id);
			return {
				name,
				email,
				isActivated,
				activationLink,
				coffeeStatus,
				userImage,
			};
		}
	}
	async activate(@Req() request: Request) {
		const activated = await this.userModel.findOneAndUpdate(
			request.params,
			{
				isActivated: true,
			}
		);
		if (!activated) {
			throw new HttpException(
				'Invalid activation link',
				HttpStatus.BAD_GATEWAY
			);
		} else {
			await activated.save();
		}
	}
	@UseInterceptors(AnyFilesInterceptor())
	async setUserPic(
		@UploadedFiles()
		file: string | NodeJS.ArrayBufferView,
		@Req() request: Request
	) {
		console.log(file);
		this.fileService.createFile(file['buffer'], request.body);
	}
}
