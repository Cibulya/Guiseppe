import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
	async sendActivationMail(to: string, link: string) {
		const transporter = nodemailer.createTransport({
			service: process.env.SMTP_SERVICE,
			host: process.env.SMTP_HOST,
			port: parseFloat(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject:
				'Account activation in CoffeeApp by Hugs for bugs Cyberdyne Systems',
			text: '',
			html: `
			<div>
			<h1>Activation</h1>
			<p style="color:green" >Welcome and thank you for join to our app!)</p>
			<p>Here you got activation link,click for finish registration...</p>
			<a href=${link}>${link}</a>
			<p>Don't drink so much coffee!</p>
			<p>Hugs for bugs Cyberdyne Systems</p>
			<p>2023</p>
			<div>${new Date()}</div>
			</div>
			`,
		});
	}
	async sentNewPassword(to: string, password: string) {
		const transporter = nodemailer.createTransport({
			service: process.env.SMTP_SERVICE,
			host: process.env.SMTP_HOST,
			port: parseFloat(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject:
				'Account activation in CoffeeApp by Hugs for bugs Cyberdyne Systems',
			text: '',
			html: `
		<style>
  @import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');
</style>
    <div class="restore-pasword__letter">
      <div class="letter__header"><p class="header__discription">Hugs For Bugs</p> <img class="letter__logo" src="${
			process.env.DEPLOYED_SERVER
		}/images/userImgTwo.png" alt="HugsForBugs"></div>
      
			<h1 class="letter__heading">Password restore message</h1>
			<p class="letter__subtitle">Finally, here your got brand new password!</p>
      <div class="letter__body">
      <p class="letter__blabla">The first rule of the club is not to mention the club.
The second rule of the club is not to mention this letter.
The third club rule is not to respond to this letter.
For non-compliance with the rules: you will be expelled from the club and we will  install Node JS latest version on your fridge !</p>
			<p class="letter__password">${password}</p>
			<p>Don't forget your pass animore!</p>
			<p>Hugs for bugs Cyberdyne Systems</p>
			<p class="letter__year">2023</p>
      </div>
			<p>${new Date()}</p>
			</div>  
			`,
		});
	}
}
