import IMiddleware from '../common/middleware.interface';
import { Request, Response, NextFunction } from 'express';

export default class TokenMiddleware implements IMiddleware {
	public execute(request: Request, response: Response, nextFunction: NextFunction): void {
		if (request.headers.weathertoken && typeof request.headers.weathertoken === 'string') {
			request.token = request.headers.weathertoken;
		}
		nextFunction();
	}
}
