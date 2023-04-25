import express, { Express } from 'express';
import { Server } from 'http';
import WeatherController from './weather/weather.controller';
import IExceptionFilter from './errors/exception.filter.interface';
import ConfigService from './config/config.service';

export default class App {
	private app: Express;
	private server: Server;
	private readonly port: number;

	constructor(
		private weatherController: WeatherController,
		private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = Number(ConfigService.getInstance().get('PORT'));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionsFilters();
		this.server = this.app.listen(this.port);
		console.log('Server Start');
	}

	private useRoutes(): void {
		this.app.use('/weather', this.weatherController.router);
	}

	private useExceptionsFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public close(): void {
		this.server.close();
	}
}
