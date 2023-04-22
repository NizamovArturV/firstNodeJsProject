import { NextFunction, Request, Response } from 'express';
import IExceptionFilter from './exception.filter.interface';

export default class ExceptionFilter implements IExceptionFilter {
	catch(error: Error, request: Request, response: Response, nextFunction: NextFunction): void {
		console.error(error);
		response.status(500).send({ error: error.message });
	}
}
