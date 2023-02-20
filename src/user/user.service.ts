import {
	HttpException,
	HttpStatus,
	Injectable,
	Req,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { UserCoffeeDto, UserQuizDto } from './user.dto';
import { User } from './user.schema';
@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private readonly mailServive: MailService,
		private readonly jwtServise: JwtService
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
			const superWord = await bcrypt.hash(user.secretWord, 5);
			user.password = superPass;
			user.secretWord = superWord;
			const newUser = await this.userModel.create(user);
			newUser.save();
			const finded = await this.userModel.findOne({
				email: newUser.email,
			});
			this.mailServive.sendActivationMail(
				user.email,
				`${process.env.DEPLOYED_SERVER}api/activate/${finded.activationLink}`
			);
			return { message: 'User created' };
		}
	}
	async login(user: Partial<User>) {
		try {
			const finded = await this.userModel.findOne({ email: user.email });

			if (!(await bcrypt.compare(user.password, finded.password))) {
				console.log('sas');
				throw new UnauthorizedException('Invalid credentials');
			} else {
				const { email } = finded;
				const jwtToken = await this.jwtServise.signAsync({ email });
				const {
					name,
					isActivated,
					activationLink,
					coffeeStatus,
					userImage,
					quizStatus,
				} = finded;
				const userDto = {
					name,
					email,
					isActivated,
					activationLink,
					coffeeStatus,
					userImage,
					quizStatus,
				};
				return { jwtToken, userDto };
			}
		} catch (e) {
			console.log(e);
			throw new UnauthorizedException('Invalid credentials');
		}
	}
	async findUser(condition: Partial<User>) {
		const finded = await this.userModel.findOne({ email: condition.email });
		if (!finded) {
			throw new UnauthorizedException('Invalid credentials');
		} else {
			return finded;
		}
	}
	async validateUser(@Req() request: Request) {
		try {
			const cookie = request.cookies['jwt'];
			if (!cookie) {
				return { message: 'Invalid credentials' };
			} else {
				const data = await this.jwtServise.verifyAsync(cookie);
				const {
					name,
					email,
					isActivated,
					activationLink,
					coffeeStatus,
					userImage,
				} = await this.userModel.findOne({
					email: data.email,
				});
				return {
					name,
					email,
					isActivated,
					activationLink,
					coffeeStatus,
					userImage,
				};
			}
		} catch (e) {
			if (e) {
				console.log(e);
			}
		}
	}
	async activate(@Req() request: Request) {
		const activated = await this.userModel.findOneAndUpdate(
			request.params,
			{
				isActivated: true,
			}
		);
		await activated.save();
	}
	async restorePassword(request: Request) {
		const finded = await this.userModel.findOne({
			email: request.body.email,
		});
		if (
			!(await bcrypt.compare(request.body.secretWord, finded.secretWord))
		) {
			throw new UnauthorizedException('Invalid credentials');
		} else {
			const superPass = await bcrypt.hash(request.body.newPassword, 5);
			await this.mailServive.sentNewPassword(
				request.body.email,
				request.body.newPassword
			);
			const modified = await this.userModel.findOneAndUpdate(
				{ email: request.body.email },
				{
					password: superPass,
				}
			);
			modified.save();
		}
	}
	async updateQuiz(userQuizDto: UserQuizDto) {
		const findedUser = await this.userModel.findOne({
			email: userQuizDto.email,
		});
		const progress = parseFloat(findedUser.quizStatus);

		const result = progress + parseFloat(userQuizDto.quizStatus);
		if (result >= 100) {
			return {
				quizStatus: 'You are allready done,Gratz!',
			};
		} else {
			const updateQuizStatus = await this.userModel.findOneAndUpdate(
				{ email: userQuizDto.email },
				{ quizStatus: result }
			);
			updateQuizStatus.save();
			return { quizStatus: `${result}` };
		}
	}
	async coffeeStatusUpdate(userCoffeDto: UserCoffeeDto) {
		const updated = await this.userModel.findOneAndUpdate(
			{ email: userCoffeDto.email },
			{
				coffeeStatus: userCoffeDto.coffeeStatus,
			}
		);
		updated.save();
		return { message: 'Last coffee saved!' };
	}
}
