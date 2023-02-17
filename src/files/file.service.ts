import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { User } from 'src/user/user.schema';
import * as uuid from 'uuid';
@Injectable()
export class FilesService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}
	async createFile(
		file: { buffer: string | NodeJS.ArrayBufferView },
		params: Partial<User>
	) {
		const fileName = uuid.v4() + '.jpg';
		const filePath = path.resolve(__dirname, '../', 'static', 'images');
		if (!fs.existsSync(filePath)) {
			fs.mkdir(filePath, { recursive: true }, (err) => {
				if (err) {
					console.log(err);
				}
			});
		}
		const pathToFileDist = path.resolve(filePath, fileName);
		fs.writeFile(pathToFileDist, file.buffer, (err) => {
			if (err) {
				console.log(err);
			}
		});
		const oldImage = await this.userModel.findOne({ email: params.email });
		const fileForDeleteName = oldImage.userImage.split('/').pop();
		if (!fileForDeleteName.match('userImgOne.png' && 'userImgTwo.png')) {
			fs.unlink(path.join(filePath, fileForDeleteName), (err) => {
				if (err) {
					console.log(err);
				}
			});
		} else {
			console.log('IDKFA');
		}
		const staticServerImagePath = `${process.env.SERVER}images/${fileName}`;
		const updatedUser = await this.userModel.findOneAndUpdate(
			{ email: params.email },
			{
				userImage: staticServerImagePath,
			}
		);
		updatedUser.save();
		const finalyUpdated = await this.userModel.findOne({
			email: params.email,
		});
		return finalyUpdated.userImage;
	}
}
