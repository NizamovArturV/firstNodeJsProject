import axios from 'axios';
import WeatherDto from './dto/weather.dto';
import OpenWeatherResponseCity from './open.weather.response.city';
import { OpenWeatherResponseWeather } from './open.weather.response.weather';
import IWeatherApiInterface from './weather.api.interface';

export default class ApiService implements IWeatherApiInterface {
	private _token: string;

	private get urlCitySearch(): string {
		return this.urlApi + '/geo/1.0/direct';
	}

	private get urlWeather(): string {
		return this.urlApi + '/data/2.5/weather';
	}

	private get urlApi(): string {
		//@TODO вынести в ENV по необходмости
		return 'http://api.openweathermap.org';
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
			throw new Error('error');
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
			throw new Error('error');
		}

		return data;
	}

	public async getWeather(city: string): Promise<WeatherDto> {
		const token = this._token;

		const cityInfo = await this.getCityLocationByName(city, token);

		const weather = await this.getWeatherByCoordinates(cityInfo.lat, cityInfo.lon, token);

		return new WeatherDto(
			weather.name,
			this.getIcon(weather.weather[0].icon),
			weather.weather[0].description,
			weather.main.temp,
			weather.main.feels_like,
			weather.main.humidity,
			weather.wind.speed,
		);
	}

	private getIcon(icon: string): string {
		switch (icon.slice(0, -1)) {
			case '01':
				return '☀️';
			case '02':
				return '🌤️';
			case '03':
				return '☁️';
			case '04':
				return '☁️';
			case '09':
				return '🌧️';
			case '10':
				return '🌦️';
			case '11':
				return '🌩️';
			case '13':
				return '❄️';
			case '50':
				return '🌫️';
			default:
				return '';
		}
	}
}
