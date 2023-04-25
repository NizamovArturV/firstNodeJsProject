import axios from 'axios';
import WeatherDto from './dto/weather.dto';
import OpenWeatherResponseCity from './open.weather.response.city';
import { OpenWeatherResponseWeather } from './open.weather.response.weather';
import IWeatherApiInterface from './weather.api.interface';
import ConfigService from '../config/config.service';

interface IconDictionary {
	[key: string]: string;
}

export default class ApiService implements IWeatherApiInterface {
	private _token: string;

	private get urlCitySearch(): string {
		return this.urlApi + '/geo/1.0/direct';
	}

	private get urlWeather(): string {
		return this.urlApi + '/data/2.5/weather';
	}

	private get urlApi(): string {
		return ConfigService.getInstance().get('API_WEATHER_URL');
	}

	private get iconDictionary(): IconDictionary {
		return {
			'01': '☀️',
			'02': '🌤️',
			'03': '☁️',
			'04': '☁️',
			'09': '🌧️',
			'10': '🌦️',
			'11': '🌩️',
			'13': '❄️',
			'50': '🌫️',
		};
	}

	set token(value: string) {
		this._token = value;
	}

	private async getCityLocationByName(
		cityName: string,
		token: string,
	): Promise<OpenWeatherResponseCity> {
		const { data } = await axios.get<OpenWeatherResponseCity[]>(this.urlCitySearch, {
			params: {
				appid: token,
				q: cityName,
				limit: 1,
				lang: 'ru',
			},
		});

		const cityInfo = data.pop();

		if (!cityInfo) {
			throw new Error('Заданный город не найден');
		}

		return cityInfo;
	}

	private async getWeatherByCoordinates(
		lat: number,
		lon: number,
		token: string,
	): Promise<OpenWeatherResponseWeather> {
		const { data } = await axios.get<OpenWeatherResponseWeather>(this.urlWeather, {
			params: {
				appid: token,
				lat: lat,
				lon: lon,
				units: 'metric',
				lang: 'ru',
			},
		});

		if (!data) {
			throw new Error('Не удалось получить погоду заднного города');
		}

		return data;
	}

	public async getWeather(city: string): Promise<WeatherDto> {
		const token = this._token;

		const cityInfo = await this.getCityLocationByName(city, token);

		const weather = await this.getWeatherByCoordinates(cityInfo.lat, cityInfo.lon, token);

		return new WeatherDto({
			cityName: weather.name,
			icon: this.getIcon(weather.weather[0].icon),
			description: weather.weather[0].description,
			temperature: weather.main.temp,
			temperatureFeels: weather.main.feels_like,
			humidity: weather.main.humidity,
			windSpeed: weather.wind.speed,
		});
	}

	private getIcon(icon: string): string {
		return this.iconDictionary[icon.slice(0, -1)] ? this.iconDictionary[icon.slice(0, -1)] : '';
	}
}
