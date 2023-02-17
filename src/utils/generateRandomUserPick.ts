export function generateUserImageLink(): string {
	const serverRoot = `${process.env.SERVER}`;
	const userPics: string[] = ['userImgTwo.png', 'userImgOne.png'];
	const randomPic = userPics[Math.floor(Math.random() * userPics.length)];
	const randomUserPic = `${serverRoot}${randomPic}`;
	return randomUserPic;
}
