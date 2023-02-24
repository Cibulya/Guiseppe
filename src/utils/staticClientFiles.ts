/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fs from 'fs';
import * as path from 'path';
const clientFolderPath = path.resolve(__dirname, '../../', 'client');
const distPath = path.resolve('./', 'dist', 'static', 'client');
// eslint-disable-next-line @typescript-eslint/no-var-requires
function clientFolder() {
	if (!fs.existsSync(distPath)) {
		fs.mkdir(distPath, (e) => {
			if (e) {
				console.log(e);
			}
		});
	} else {
		return;
	}
}
export async function htmlBuilderTrebute() {
	clientFolder();
	fs.readdir(
		clientFolderPath,
		{ encoding: 'utf-8', withFileTypes: true },
		(e, files) => {
			files.forEach((file) => {
				const filePath = path.resolve(clientFolderPath, file.name);
				if (file.isFile()) {
					const fileInDist = path.resolve(distPath, file.name);
					fs.copyFile(filePath, fileInDist, (e) => {
						if (e) {
							console.log(e);
						}
					});
				} else if (file.isDirectory()) {
					const folderInDist = path.resolve(distPath, file.name);
					if (!fs.existsSync(folderInDist)) {
						fs.mkdir(folderInDist, (e) => {
							if (e) console.log('eds');
						});
					}
					const deepFolder = path.resolve(
						clientFolderPath,
						file.name
					);
					fs.readdir(
						deepFolder,
						{ encoding: 'utf-8', withFileTypes: true },
						(e, files) => {
							files.forEach((deepFile) => {
								if (deepFile.isFile()) {
									const veryDeepFilePath = path.resolve(
										deepFolder,
										deepFile.name
									);
									const a = path.resolve(
										distPath,
										folderInDist,
										deepFile.name
									);
									fs.copyFile(veryDeepFilePath, a, (e) => {
										if (e) {
											console.log(e);
										}
									});
								}
								if (deepFile.isDirectory()) {
									const deepestPathInTheWorld = path.resolve(
										deepFolder,
										deepFile.name
									);
									const deepestFileDistPath = path.resolve(
										distPath,
										folderInDist,
										deepFile.name
									);
									if (!fs.existsSync(deepestFileDistPath)) {
										fs.mkdir(deepestFileDistPath, (e) => {
											if (e) {
												console.log(e);
											}
										});
										fs.readdir(
											deepestPathInTheWorld,
											{
												encoding: 'utf-8',
												withFileTypes: true,
											},
											(e, superDeepFiles) => {
												superDeepFiles.forEach(
													(superDeepFile) => {
														const superDeepFilePath =
															path.resolve(
																deepestPathInTheWorld,
																superDeepFile.name
															);
														const superDeepFileInDist =
															path.resolve(
																deepestFileDistPath,
																superDeepFile.name
															);
														fs.copyFile(
															superDeepFilePath,
															superDeepFileInDist,
															(e) => {
																if (e) {
																	console.log(
																		e
																	);
																}
															}
														);
														fs.readdir(
															superDeepFilePath,
															{
																encoding:
																	'utf-8',
																withFileTypes:
																	true,
															},
															(
																e,
																thedeapestFiles
															) => {
																console.log(
																	thedeapestFiles
																);
															}
														);
													}
												);
											}
										);
									} else {
									}
								}
							});
						}
					);
				}
			});
		}
	);
}
