import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}
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
}
