import * as fs from 'fs';
import * as path from 'path';
export async function defaultUserPics() {
	const filesFolder = path.resolve('./', 'src', 'userPics');
	fs.readdir(filesFolder, { encoding: 'utf-8' }, (err, files) => {
		if (err) {
			console.log(err);
		} else {
			const imagesFolder = path.resolve(
				'./',
				'dist',
				'static',
				'client',
				'images'
			);
			if (fs.existsSync(imagesFolder)) {
				return;
			} else {
				fs.mkdir(imagesFolder, (er) => {
					if (er) {
						console.log(er);
					}
				});
			}
			files.forEach((file) => {
				const filePath = path.join(filesFolder, file);
				const distPath = path.join(imagesFolder, file);
				fs.copyFile(filePath, distPath, (err) => {
					if (err) {
						console.log(err);
					}
				});
			});
		}
	});
}
