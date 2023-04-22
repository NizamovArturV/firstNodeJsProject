import BaseController from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import TokenMiddleware from './token.middleware';
import ApiService from './api.service';
import IWeatherApiInterface from './weather.api.interface';

export default class WeatherController extends BaseController {
	private readonly apiService: IWeatherApiInterface;

	public constructor() {
		super();

		this.bindRoutes([
			{
				path: '/:cityName',
				function: this.getWeather,
				method: 'get',
				middlewares: [new TokenMiddleware()],
			},
		]);
		this.apiService = new ApiService();
	}

	public async getWeather(
		request: Request,
		response: Response,
		nextFunction: NextFunction,
	): Promise<void> {
		try {
			if (this.apiService instanceof ApiService) {
				this.apiService.token = request.token;
			}
			const weather = await this.apiService.getWeather(request.params.cityName);
			this.ok(response, weather);
		} catch (e) {
			nextFunction(e);
		}
	}
}
