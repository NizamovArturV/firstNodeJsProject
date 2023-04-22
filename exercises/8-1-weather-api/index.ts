import App from "./src/app";
import WeatherController from "./src/weather/weather.controller";
import ExceptionFilter from "./src/errors/exception.filter";

async function bootstrap() {
    //@TODO использовать DI при расширении приложения, пока можно ограничится этим
    const app = new App(
        new WeatherController(),
        new ExceptionFilter()
    );
    await app.init();
}

bootstrap();