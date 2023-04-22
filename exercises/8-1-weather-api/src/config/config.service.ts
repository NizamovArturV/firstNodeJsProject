import { config, DotenvParseOutput } from 'dotenv';

export default class ConfigService {
	private static _instance: ConfigService;

	private readonly config: DotenvParseOutput;

	private constructor() {
		const result = config();

		if (result.error) {
			throw new Error('[ConfigService] Не удалось прочитать файл .env или он отсуствует');
		} else {
			if (result.parsed) {
				this.config = result.parsed;
			}
		}
	}

	public static getInstance(): ConfigService {
		return this._instance || (this._instance = new this());
	}

	public get(key: string): string {
		return this.config[key];
	}
}
