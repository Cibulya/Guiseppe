export function generateUserImageLink(): string {
	const userPics: string[] = [
		'userImgTwo.png',
		'userImgOne.png',
		'userImgThree.png',
		'userImgFour.png',
	];
	const randomPic = userPics[Math.floor(Math.random() * userPics.length)];
	const randomUserPic = `${process.env.DEPLOYED_SERVER}images/${randomPic}`;
	return randomUserPic;
}
