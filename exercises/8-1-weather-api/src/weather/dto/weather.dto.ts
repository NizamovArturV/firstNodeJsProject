interface WeatherDtoConstruct {
	cityName: string;
	icon: string;
	description: string;
	temperature: number;
	temperatureFeels: number;
	humidity: number;
	windSpeed: number;
}

export default class WeatherDto {
	public cityName: string;
	public icon: string;
	public description: string;
	public temperature: number;
	public temperatureFeels: number;
	public humidity: number;
	public windSpeed: number;

	constructor(objectConstruct: WeatherDtoConstruct) {
		this.cityName = objectConstruct.cityName;
		this.icon = objectConstruct.icon;
		this.description = objectConstruct.description;
		this.temperature = objectConstruct.temperature;
		this.temperatureFeels = objectConstruct.temperatureFeels;
		this.humidity = objectConstruct.humidity;
		this.windSpeed = objectConstruct.windSpeed;
	}
}
