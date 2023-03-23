import DateConverter from "./dateConverter.js";
import DateConverterError from "./dateConverterError.js";

const dateConverter = new DateConverter()

try {
    //Ожидается строка в формате 1w 2d 3h 4m 5s 6ms - можно передавать в любом порядке
    //Если значение будет передано дважды, например 4s 3s, то будет взято последнее
    const secondsFromParams = dateConverter.getTimeFromParams(process.argv);

    setTimeout(() => {
        console.log('Таймер сработал!')
    }, secondsFromParams)

} catch (e) {
    if (e instanceof DateConverterError) {
        console.log('Ошибка выполнения:');
        console.log(e.message);
    } else {
        throw e;
    }
}
