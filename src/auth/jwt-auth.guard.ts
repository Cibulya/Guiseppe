import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		try {
			const authHeader = req.headers.authorization;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];
			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({
					Message: 'Invalid password',
				});
			} else {
				const user = await this.jwtService.verify(token, {
					secret: process.env.SECRET,
				});
				req.user = user;
				return true;
			}
		} catch (e) {
			console.log(e);
			throw new UnauthorizedException({ Message: 'Invalid password' });
		}
	}
}
