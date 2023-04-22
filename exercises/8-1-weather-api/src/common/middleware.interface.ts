import { NextFunction, Request, Response } from 'express';

export default interface IMiddleware {
	execute: (request: Request, response: Response, nextFunction: NextFunction) => void;
}
