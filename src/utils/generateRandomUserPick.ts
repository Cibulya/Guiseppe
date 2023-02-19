export function generateUserImageLink(): string {
	const serverRoot = `${process.env.SERVER}`;
	const userPics: string[] = [
		'userImgTwo.png',
		'userImgOne.png',
		'userImgThree.png',
		'userImgFour.png',
	];
	const randomPic = userPics[Math.floor(Math.random() * userPics.length)];
	const randomUserPic = `${process.env.SERVER}images/${randomPic}`;
	return randomUserPic;
}
