import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
@Injectable()
export class FilesService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}
	async createFile(
		file: { buffer: string | NodeJS.ArrayBufferView },
		params: Partial<User>
	) {
		console.log(file);
		// // console.log(file);
		// const fileName = uuid.v4() + '.jpg';
		// const filePath = path.resolve(__dirname, '../', 'static');
		// if (!fs.existsSync(filePath)) {
		// 	fs.mkdir(filePath, { recursive: true }, (err) => {
		// 		if (err) {
		// 			console.log(err);
		// 		}
		// 	});
		// }
		// fs.writeFile(
		// 	path.join(filePath, fileName),
		// 	file[0].buffer,
		// 	(err) => {
		// 		if (err) {
		// 			console.log(err);
		// 		}
		// 	}
	}
}
