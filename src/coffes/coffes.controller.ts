import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { ApiBody, ApiParam } from '@nestjs/swagger/dist/decorators';
import { Request, Response } from 'express';
import { Coffee } from './coffes.schema';
import { CoffesService } from './coffes.service';
@ApiTags('All operations with Coffees')
@Controller('coffees')
export class CoffesController {
	constructor(private readonly coffeService: CoffesService) {}
	@ApiOperation({ summary: 'Get all coffies' })
	@ApiResponse({
		status: 201,
		type: [Coffee],
		description: 'Returns all coffees',
	})
	@Get()
	async getAllCoffes() {
		return this.coffeService.findAllCoffee();
	}
	@ApiOperation({
		summary: 'Add one coffee to collection',
		description: 'Add coffee to datadbase',
	})
	@ApiResponse({
		status: 201,
		description: 'Coffee added to collection',
	})
	@ApiBody({
		type: Coffee,
	})
	@Post()
	async postNewCoffe(@Req() req: Request, @Res() res: Response) {
		this.coffeService.create(req.body);
		return res.status(200).json({ Message: 'Coffee added to collection' });
	}
	@ApiOperation({
		summary: 'Find one coffee in collection',
		description: 'Find one coffee',
	})
	@ApiResponse({
		status: 201,
		type: Coffee,
	})
	@ApiParam({
		example: '1',
		description: '1',
		name: 'index',
	})
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
	//don't need for production
	// @ApiOperation({
	// 	summary: 'Patch one coffee in collection',
	// 	description: 'Patch one coffee',
	// })
	// @ApiResponse({
	// 	status: 201,
	// 	type: Coffee,
	// })
	// @ApiParam({
	// 	example: '1',
	// 	description: '1',
	// 	name: 'index',
	// })
	// @ApiBody({ type: Coffee })
	// @Patch(':index')
	// async updateCoffee(@Req() req: Request, @Res() res: Response) {
	// 	const coffee = await this.coffeService.updateCoffee(
	// 		req.params,
	// 		req.body
	// 	);
	// 	if (!coffee) {
	// 		return res.status(404).json({ Message: 'Coffee not found' });
	// 	} else {
	// 		return res.status(200).json({ Message: 'Coffee updated' });
	// 	}
	// }
}
