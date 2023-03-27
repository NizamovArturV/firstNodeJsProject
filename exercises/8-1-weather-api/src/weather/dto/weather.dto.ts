export default class WeatherDto {
	constructor(
		public cityName: string,
		public icon: string,
		public description: string,
		public temperature: number,
		public temperatureFeels: number,
		public humidity: number,
		public windSpeed: number,
	) {}
}
