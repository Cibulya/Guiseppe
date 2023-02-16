// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import * as fs from 'fs';
// import { Model, UpdateQuery } from 'mongoose';
// import * as path from 'path';
// // import { User } from 'src/users/users.schema';
// import * as uuid from 'uuid';
// @Injectable()
// export class FilesService {
// 	constructor(@InjectModel(User.name) private userModel: Model<User>) {}
// 	async createFile(
// 		file: { buffer: string | NodeJS.ArrayBufferView },
// 		params: UpdateQuery<User>
// 	) {
// 		try {
// 			const fileName = uuid.v4() + '.jpg';
// 			const filePath = path.resolve(__dirname, '../', 'static');
// 			if (!fs.existsSync(filePath)) {
// 				fs.mkdir(filePath, { recursive: true }, (err) => {
// 					if (err) {
// 						console.log(err);
// 					}
// 				});
// 				fs.open('index.html', 'w', async (err) => {
// 					if (err) {
// 						throw new Error();
// 					}
// 				});
// 			}
// 			fs.writeFile(path.join(filePath, fileName), file.buffer, (err) => {
// 				if (err) {
// 					console.log(err);
// 				}
// 			});
// 			const userPicLink = `${process.env.SERVER}${fileName}`;
// 			const findedUser = await this.userModel.findOneAndUpdate(
// 				{ userName: params.userName },
// 				{
// 					userPic: userPicLink,
// 				}
// 			);
// 			console.log(findedUser);
// 			return userPicLink;
// 		} catch (e) {
// 			throw new HttpException(
// 				'File no created',
// 				HttpStatus.INTERNAL_SERVER_ERROR
// 			);
// 		}
// 	}
// }
