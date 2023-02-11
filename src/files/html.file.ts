import * as fs from 'fs';
import * as path from 'path';
export async function createStaticFolder(): Promise<void> {
	fs.mkdir(
		path.resolve(__dirname, '../', 'static'),
		{ recursive: true },
		async (err) => {
			if (err) {
				console.log(err);
			}
		}
	);
	fs.open(
		path.resolve(__dirname, '../', 'static', 'index.html'),

		'w',
		async (err) => {
			if (err) {
				throw new Error();
			}
		}
	);
}
