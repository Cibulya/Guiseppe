import { Controller, Post, Req, Get, Res, Patch } from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'express';
import { CoffesService } from './coffes.service';

@Controller('coffees')
export class CoffesController {
	constructor(private readonly coffeService: CoffesService) {}
	@Get()
	async getAllCoffes() {
		return this.coffeService.findAllCoffee();
	}
	@Post()
	async postNewCoffe(@Req() req: Request, @Res() res: Response) {
		this.coffeService.create(req.body);
		return res.status(200).json({ Message: 'Coffee added to collection' });
	}
	@Get(':index')
	async findOne(@Req() req: Request, @Res() res: Response) {
		const finded = await this.coffeService.findOneCoffee(req.params);
		if (!finded) {
			return res.status(404).json({ Message: 'Coffee not found' });
		} else {
			return res
				.status(200)
				.json(await this.coffeService.findOneCoffee(req.params));
		}
	}
	@Patch(':index')
	async updateCoffee(@Req() req: Request, @Res() res: Response) {
		const coffee = await this.coffeService.updateCoffee(
			req.params,
			req.body
		);
		if (!coffee) {
			return res.status(404).json({ Message: 'Coffee not found' });
		} else {
			return res.status(200).json({ Message: 'Coffee updated' });
		}
	}
}
