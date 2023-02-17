import * as fs from 'fs';
import * as path from 'path';
export async function defaultUserPics() {
	const filesFolder = path.resolve('./', 'src', 'userPics');
	fs.readdir(filesFolder, { encoding: 'utf-8' }, (err, files) => {
		if (err) {
		} else {
			files.forEach((file) => {
				const filePath = path.join(filesFolder, file);
				const distPath = path.join('./', 'dist', 'static', file);
				fs.copyFile(filePath, distPath, (err) => {
					if (err) {
						console.log(err);
					}
				});
			});
		}
	});
}
