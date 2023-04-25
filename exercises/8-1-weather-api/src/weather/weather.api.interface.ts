import WeatherDto from './dto/weather.dto';

export default interface IWeatherApiInterface {
	getWeather: (cityName: string) => Promise<WeatherDto>;
}
